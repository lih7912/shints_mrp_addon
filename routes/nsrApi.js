const router = require('express').Router;
const mssqlExec = require('./mssqlExec');
const moment = require('moment');
const nsrApi = router();

nsrApi.all('/insert_docu_material/:user_id', async (req, res) => {
    let input = req.body.DATA1;
    let today = moment().format('YYYYMMDD');

    console.log('-------------------', input);

    if (!input) {
        res.end(JSON.stringify([ {INVOICE_NO: -1, DOCU_NO: -1} ]));   
    }
    
    let maxInSq = await mssqlExec.mssqlExec(
        `SELECT ISNULL(MAX(IN_SQ), 0) AS MAX_IN_SQ FROM dbo.SAUTODOCUH WHERE IN_DT = '${today}'`
    );
    maxInSq = maxInSq[0].MAX_IN_SQ + 1;

    let maxLnSq = await mssqlExec.mssqlExec(
        `SELECT ISNULL(MAX(LN_SQ), 0) AS MAX_LN_SQ FROM dbo.SAUTODOCUH WHERE IN_DT = '${today}' AND IN_SQ = ${maxInSq}`
    );
    maxLnSq = maxLnSq[0].MAX_LN_SQ + 1;
    
    let documentNo = `${today}-${String(maxInSq).padStart(5, '0')}-${String(maxLnSq).padStart(3, '0')}`;

    console.log('documentNo:', documentNo);

    /*
    await mssqlExec.mssqlExec(
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
            DRCR_FG,      -- 차·대구분 (3:차변, 4:대변)
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
            '${moment().format('YYYYMMDD')}',      -- 처리일자
            ${IN_SQ},        -- 처리번호
            ${LN_SQ},        -- 처리라인번호
            '1000', -- 회사코드
            '1000', -- 처리사업장
            '${LOGIC_CD}',   -- 전표유형
            '${ISU_DT}',     -- 결의일자
            ${ISU_SQ},       -- 결의번호
            '${DIV_CD}',     -- 회계단위
            '${DEPT_CD}',    -- 결의부서
            '${EMP_CD}',     -- 작업자
            '${ACCT_CD}',    -- 계정과목
            '${DRCR_FG}',    -- 차대구분
            ${ACCT_AM},      -- 금액
            '${RMK_NB}',     -- 적요번호
            '${RMK_DC}',     -- 적요
            '${ATTR_CD}',    -- 증빙구분
            '${TRCD_TY}',    -- A_TY
            '${TRNM_TY}',    -- B_TY
            '${DEPTCD_TY}',  -- C_TY
            '${PJTCD_TY}',   -- D_TY
            '${CTNB_TY}',    -- E_TY
            '${FRDT_TY}',    -- F_TY
            '${TODT_TY}',    -- G_TY
            '${QT_TY}',      -- H_TY
            '${AM_TY}',      -- I_TY
            '${RT_TY}',      -- J_TY
            '${DEAL_TY}',    -- K_TY
            '${USER1_TY}',   -- L_TY
            '${USER2_TY}',   -- M_TY
            '${TR_CD}',      -- 거래처코드
            '${TR_NM}',      -- 거래처명
            '${CT_DEPT}',    -- C_TY 관련 코드
            '${DEPT_NM}',    -- C_TY 관련 코드명
            '${PJT_CD}',     -- D_TY 관련 코드
            '${PJT_NM}',     -- D_TY 관련 코드명
            '${CT_NB}',      -- E_TY 관련 코드
            '${FR_DT}',      -- 시작일자
            '${TO_DT}',      -- 종료일자
            ${CT_QT},        -- 수량
            ${CT_AM},        -- 금액
            ${CT_RT},        -- 비율
            '${CT_DEAL}',    -- K_TY 코드
            '${DEAL_NM}',    -- K_TY 관련 코드명
            '${CT_USER1}',   -- L_TY 코드
            '${USER1_NM}',   -- CT_USER1 명
            '${CT_USER2}',   -- M_TY 코드
            '${USER2_NM}',   -- CT_USER2 명
            '${EXCH_TY}',    -- 외화종류
            ${EXCH_AM},      -- 외화금액
            '${PAYMENT}',    -- 지급은행지점명
            '${ISU_NM}',     -- 발행인
            '${ENDORS_NM}',  -- 배서인
            '${BILL_FG1}',   -- 어음종류
            '${BILL_FG2}',   -- 수금구분
            '${DUMMY1}',     -- 여분1
            '${DUMMY2}',     -- 여분2
            '${DUMMY3}',     -- 여분3
            '${INSERT_DT}',  -- 입력일자
            '${EX_FG}',      -- 자료구분
            '${TR_NMK}',     -- 거래처명(다국어)
            '${DEPT_NMK}',   -- 부서명(다국어)
            '${PJT_NMK}',    -- 프로젝트명(다국어)
            '${DEAL_NMK}',   -- 거래유형명(다국어)
            '${USER1_NMK}',  -- 사용자1명(다국어)
            '${USER2_NMK}',  -- 사용자2명(다국어)
            '${RMK_DCK}',    -- 적요(다국어)
            '${ISU_DOC}',    -- 품의내역
            '${ISU_DOCK}',   -- 품의내역(다국어)
            '${PRS_FG}',     -- ?
            '${JEONJA_YN}',  -- 전자세금계산서여부
            '${PAYMENT_PT}', -- 지급은행지점명
            '${DEAL_FG}'     -- 보관구분
        );
        `
    )
    */

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(JSON.stringify([ {INVOICE_NO: col.nm_note, DOCU_NO: documentNo} ]));
});

module.exports = nsrApi;