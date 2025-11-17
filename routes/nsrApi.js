const router = require('express').Router;
const mssqlExec = require('./mssqlExec');
const moment = require('moment');
const nsrApi = router();

nsrApi.all('/insert_docu_material/:user_id', async (req, res) => {
    let input = [...req.body][0].DATA1;
    let input2 = [...req.body][0].DATA2;
    const today = moment().format('YYYYMMDD');
    
    if (!input) {
        res.end(JSON.stringify([ {error: '입력값이 없습니다.'} ]));
        return;
    }

    if (!input.nsrTrCd) {
        res.end(JSON.stringify([ {error: '거래처정보가 입력되이 않았습니다.(NSR_TR_CD)'} ]));
        return;
    }

    /*** 계정과목 NSR에 맞게 변환 ***/
    // 차변
    input.ct_deal = '';
    input.cd_acct = '14900';

    if (input.cd_acct === '15400') {
        input.cd_acct = '13500';
        
        // 부가세대급금(면세)
        if (input.tp_tax === '26') {
            input.tp_tax = '23';
            input.ct_deal = '면세'
        }

        // 부가세대급금(영세)
        if (input.tp_tax === '23') {
            input.tp_tax = '22';
            input.ct_deal = '영세'
        }

        // 부가세대급금(과세)
        if (input.tp_tax === '21') {
            input.tp_tax = '21';
            input.ct_deal = '과세'
        }
    }

    // 대변
    input.ct_deal = '';
    input2.cd_acct = '25101'
    // 부가세대급금(면세)
    if (input2.tp_tax === '26') {
        input2.tp_tax = '23';
        input2.ct_deal = '면세'
    }

    // 부가세대급금(영세)
    if (input2.tp_tax === '23') {
        input2.tp_tax = '22';
        input2.ct_deal = '영세'
    }

    // 부가세대급금(과세)
    if (input2.tp_tax === '21') {
        input2.tp_tax = '21';
        input2.ct_deal = '과세'
    }
    /*** 계정과목 NSR에 맞게 변환 ***/

    let maxInSq = await mssqlExec.mssqlExec(
        `SELECT ISNULL(MAX(IN_SQ), 0) AS MAX_IN_SQ FROM dbo.SAUTODOCUD`
    );

    maxInSq = maxInSq[0].MAX_IN_SQ + 1;

    let maxLnSq = await mssqlExec.mssqlExec(
        `SELECT ISNULL(MAX(LN_SQ), 0) AS MAX_LN_SQ FROM dbo.SAUTODOCUD WHERE IN_DT = '${today}' AND IN_SQ = ${maxInSq}`
    );
    maxLnSq = maxLnSq[0].MAX_LN_SQ + 1;

    let maxIsuSq = await mssqlExec.mssqlExec(
        `SELECT ISNULL(MAX(ISU_SQ), 0) AS MAX_ISU_SQ FROM dbo.SAUTODOCUD WHERE IN_DT = '${today}'`
    );
    maxIsuSq = maxIsuSq[0].MAX_ISU_SQ + 1;
    
    let documentNo = `${today}-${String(maxInSq).padStart(5, '0')}-${String(maxLnSq).padStart(3, '0')}`;

    await execDbInsert('차변', input, input2, maxInSq, maxLnSq, maxIsuSq, res);
    await execDbInsert('대변', input, input2, maxInSq, ++maxLnSq, maxIsuSq, res);
    await execDbInsert('부가세', input, input2, maxInSq, ++maxLnSq, maxIsuSq, res);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(JSON.stringify([ {INVOICE_NO: input.nm_note, DOCU_NO: documentNo} ]));
});

async function execDbInsert(mode, input, input2, maxInSq, maxLnSq, maxIsuSq, res) {
    const 차변   = mode === '차변';
    const 대변   = mode === '대변';
    const 부가세 = mode === '부가세';

    const today = moment().format('YYYYMMDD');

    let vendorName = input.nm_mngd1.replace(/\(.*?\)/g, '').trim();
    let insideBrackets = [...input.nm_mngd1.matchAll(/\((.*?)\)/g)].map(m => m[1]);
    let vendorInfo = await mssqlExec.mssqlExec(`SELECT * FROM ZA_TRADE_DAIKIN WHERE TR_CD = '${input.nsrTrCd}'`);
    if (!vendorInfo?.length) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify([ {error: '거래처 정보를 찾을 수 없습니다.'} ]));
        throw new Error('거래처 정보를 찾을 수 없습니다.');
    }

    vendorName = vendorInfo[0].TR_NM;
    let vendorCd = vendorInfo[0].TR_CD;

    let AMT = parseFloat(input.amt);  // 부가세 포함금액 (총액)
    const vatRate = 0.1;  // 부가세율 10%
    let VAT = Math.round(AMT * vatRate);

    if (차변) {
        AMT = parseFloat(input.amt);
    } else if (대변) {
        AMT = parseFloat(input.amt) + VAT;
    } else if (부가세) {
        AMT = VAT;
    }

    try {
        let result = await mssqlExec.mssqlExec(
            `
            INSERT INTO dbo.SAUTODOCUD (
                IN_DT,        -- 처리일자 (PK)
                IN_SQ,        -- 처리번호 (PK)
                LN_SQ,        -- 처리라인번호 (PK)
                CO_CD,        -- 회사코드 (PK)
                IN_DIV_CD,    -- 처리사업장
                LOGIC_CD,     -- 전표유형
                ISU_DT,       -- 결의일자
                ISU_SQ,       -- 결의번호
                DIV_CD,       -- 회계단위
                DEPT_CD,      -- 결의부서
                EMP_CD,       -- 작업자
                ACCT_CD,      -- 계정과목
                DRCR_FG,      -- 차·대구분 (차변 3, 대변 4, 부가세 3)
                ACCT_AM,      -- 금액
                RMK_NB,       -- 적요번호
                RMK_DC,       -- 적요
                ATTR_CD,      -- 증빙구분
                TRCD_TY,      -- A_TY
                TRNM_TY,      -- B_TY
                DEPTCD_TY,    -- C_TY
                PJTCD_TY,     -- D_TY
                CTNB_TY,      -- E_TY
                FRDT_TY,      -- F_TY
                TODT_TY,      -- G_TY
                QT_TY,        -- H_TY
                AM_TY,        -- I_TY
                RT_TY,        -- J_TY
                DEAL_TY,      -- K_TY
                USER1_TY,     -- L_TY
                USER2_TY,     -- M_TY
                TR_CD,        -- 거래처코드
                TR_NM,        -- 거래처명
                CT_DEPT,      -- C_TY 관련 코드
                DEPT_NM,      -- C_TY 관련 코드명
                PJT_CD,       -- D_TY 관련 코드
                PJT_NM,       -- D_TY 관련 코드명
                CT_NB,        -- E_TY 관련 코드
                FR_DT,        -- 일자 (20061112)
                TO_DT,        -- 일자 (20061112)
                CT_QT,        -- 수량 (numeric)
                CT_AM,        -- 금액 (numeric)
                CT_RT,        -- 비율 (numeric)
                CT_DEAL,      -- K_TY 코드
                DEAL_NM,      -- K_TY 관련 코드명
                CT_USER1,     -- L_TY 코드
                USER1_NM,     -- CT_USER1 명
                CT_USER2,     -- M_TY 코드
                USER2_NM,     -- CT_USER2 명
                EXCH_TY,      -- 외화종류
                EXCH_AM,      -- 외화금액
                PAYMENT,      -- 지급은행지점명
                ISU_NM,       -- 발행인
                ENDORS_NM,    -- 배서인
                BILL_FG1,     -- 어음종류
                BILL_FG2,     -- 수금구분
                DUMMY1,       -- 여분1
                DUMMY2,       -- 여분2
                DUMMY3,       -- 여분3
                INSERT_DT,    -- 입력일자
                EX_FG,        -- 자료구분
                TR_NMK,       -- 거래처명(다국어)
                DEPT_NMK,     -- 부서명(다국어)
                PJT_NMK,      -- 프로젝트명(다국어)
                DEAL_NMK,     -- 거래유형명(다국어)
                USER1_NMK,    -- 사용자1명(다국어)
                USER2_NMK,    -- 사용자2명(다국어)
                RMK_DCK,      -- 적요(다국어)
                ISU_DOC,      -- 품의내역
                ISU_DOCK,     -- 품의내역(다국어)
                PRS_FG,       -- ?
                JEONJA_YN,    -- 전자세금계산서여부
                PAYMENT_PT,   -- 지급은행지점명
                DEAL_FG       -- 보관구분
            )
            VALUES (
                '${today}',           -- 처리일자
                ${maxInSq},           -- 처리번호
                ${maxLnSq},           -- 처리라인번호
                '1000',               -- 회사코드
                '1000',               -- 처리사업장
                '${부가세 ? '21' : ''}', -- 전표유형 (21: 매입, 31: 매출, 41: 수금, 51: 반제)
                '00000000',           -- 결의일자
                ${maxIsuSq},          -- 결의번호
                '1000',               -- 회계단위
                '0602',               -- 결의부서
                 NULL,                -- 작업자
                '${차변 ? input.cd_acct : 대변 ? input2.cd_acct : '13500' }',   -- 계정과목
                '${차변 ? '3' : 대변 ? '4' : '3'}',         -- 차대구분 (차변 3, 대변 4, 부가세 3)
                ${AMT},               -- 금액
                '',                   -- 적요번호
                '${input.nm_note}',   -- 적요
                '0',                  -- 증빙구분
                'A1',                 -- A_TY
                'B1',                 -- B_TY
                'C1',                 -- C_TY
                '${차변 ? '0'  : 대변 ? 'D5' : '0'}',        -- D_TY (차변 0, 대변 D5, 부가세 0)
                '${차변 ? 'E6' : '0'}',                      -- E_TY 사업장 (차변 E6, 대변 0, 부가세 0)
                '${대변 ? 'F3' : 부가세 ? 'F1' : '0'}',      -- F_TY 관리번호 (차변 0, 대변 F3, 부가세 F1)
                0,                    -- G_TY 발생일자
                '${차변 ? 'H1' : 부가세 ? 'H3' : '0'}',      -- H_TY (차변 H1, 대변 0, 부가세 H3)
                '${차변 ? 'I4' : 부가세 ? 'I3' : '0'}',      -- I_TY (차변 I4, 대변 0, 부가세 I3)
                0,                    -- J_TY
                '${차변 ? 'K6' : 부가세 ? 'K1' : '0'}',      -- K_TY (차변 K6, 대변 0, 부가세 K1)
                0,                    -- L_TY 
                0,                    -- M_TY
                '${vendorCd}',        -- 거래처코드
                '${vendorName}',      -- 거래처명
                '${차변 ? '1000' : 대변 ? '1000' : ''}',     -- C_TY 관련 코드 (차변 1000, 대변 1000, 부가세 '')
                NULL,                 -- C_TY 관련 코드명
                '${부가세 ? '1000' : ''}',                   -- D_TY 관련 코드 (차변 '', 대변 '', 부가세 1000)
                '${부가세 ? '(주)엔에스알' : ''}',            -- D_TY 관련 코드명 (부가세 (주)엔에스알)
                0,                    -- E_TY 관련 코드 
                '${부가세 ? today : ''}',                    -- 시작일자
                '${부가세 ? today : ''}',                    -- 종료일자 (부가세 today)
                0,                    -- 수량
                ${부가세 ? AMT : 0},  -- 금액 (부가세일 경우 부가세 금액)
                0,                    -- 비율
                '${부가세 ? input.tp_tax : '0'}', -- K_TY 코드
                '${input.ct_deal ?? ''}', -- K_TY 관련 코드명
                0,                    -- CT_USER1 명
                0,                    -- CT_USER1 명
                0,                    -- M_TY 코드
                0,                    -- CT_USER2 명
                NULL,                 -- 외화종류
                0,                    -- 외화금액
                NULL,                 -- 지급은행지점명
                NULL,                 -- 발행인
                NULL,                 -- 배서인
                NULL,                 -- 어음종류
                NULL,                 -- 수금구분
                NULL,                 -- 여분1
                NULL,                 -- 여분2
                NULL,                 -- 여분3
                GETDATE(),            -- 입력일자
                '1',                  -- 자료구분
                NULL,                 -- 거래처명(다국어)
                NULL,                 -- 부서명(다국어)
                NULL,                 -- 프로젝트명(다국어)
                NULL,                 -- 거래유형명(다국어)
                NULL,                 -- 사용자1명(다국어)
                NULL,                 -- 사용자2명(다국어)
                '',                   -- 적요(다국어)
                '원부자재',            -- 품의내역
                NULL,                 -- 품의내역(다국어)
                NULL,                 -- 미정 필드 (?)
                '${부가세 ? '1' : ''}', -- 전자세금계산서 여부
                NULL,                 -- 지급은행지점명
                NULL                  -- 보관구분
            );
            `
        );

        console.log(result);
    } catch (e) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(JSON.stringify([ {error: e.message} ]));
        console.log(e);
        return;
    }
}

module.exports = nsrApi;