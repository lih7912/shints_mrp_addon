const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

var request_sync = require('sync-request');
var rp = require('request-promise');
const multiparty = require('multiparty');
var amqp = require('amqplib/callback_api');
var iconv = require('iconv-lite');

import { Prisma } from "@prisma/client";
import prisma from "./db";  //PrismaClient 사용하기 위해 불러오기
import AFLib from "./commlib";  //PrismaClient 사용하기 위해 불러오기

const process1 = async(argPuCd:string) => {

    var tRetDate: string = AFLib.getCurrTime();
    var tRetDate1: string = tRetDate.substring(0, 8);

    var sql0 : string =  `
        select
             b2.CD_NAME as TAX_KIND_N,
             a1.TAX_KIND,
             a1.BILL_CD,
             isnull(a1.DOCU_NO, '') as DOCU_NO,
             b1.VENDOR_NAME,
             b1.VENDOR_CD,
             b1.VENDOR_TYPE,
             a1.INVOICE_DATE,
             a1.PAY_DATE,
             isnull(b1.PAY_TERM, '0') as PAY_TERM,
             isnull(b1.PAY_TYPE, '') as PAY_TYPE,
             a1.CURR_CD,
             a1.PO_AMT,
             a1.DEPOSIT_AMT,
             a1.LC_AMT,
             a1.DEBIT_AMT,
             a1.DISCOUNT_AMT,
             a1.VAT_AMT,
             a1.PAY_AMT,
             a1.REG_USER,
             a1.BILL_FLAG,
             a1.GW_STATUS,
             isnull(b3.CD_NAME, '') as GW_STATUS_N,
             a1.PAY_BANK,
             isnull(b4.BANK_NAME, '') as BANK_NAME,
             isnull(b4.ACCOUNT_NO, '') as ACCOUNT_NO,
             isnull(b4.ACCOUNT_NAME, '') as ACCOUNT_NAME,
             isnull(a1.TAXBILL_CD, '') as TAXBILL_CD,
             isnull(b4.SFTCODE, '') as SFTCODE,
             isnull(b5.CD_NAME, '') as PAY_TYPE_N,
             isnull(a1.APPRO_KEY, '') as APPROKEY
        from
             ksv_bill_mst a1
             left join kcd_bank b4 on a1.pay_bank = b4.bank_cd
             left join kcd_code b3 on a1.gw_status = b3.cd_code and b3.cd_group = 'GW_STATUS'
             left join kcd_code b2 on a1.tax_kind = b2.cd_code and b2.cd_group = 'TAX_KIND',
             kcd_vendor b1
             left join kcd_code b5 on b5.cd_code = b1.PAY_TYPE and b5.cd_group = 'PAY_TYPE'
           where a1.vendor_cd =  b1.vendor_cd
           and   a1.bill_flag = '1'
           and   a1.gw_status = '2'
           and   (a1.docu_no is null or a1.docu_no = '') 
           and   a1.appro_key like 'ML%'
        order by b1.vendor_cd 
    `;
    var obj0 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql0));

    var tIdx :number = 0; 
    var tArray = [];
    for (tIdx = 0; tIdx < obj0.length; tIdx++) {
        var tOne : Object  = { ...obj0[tIdx] };

        var tBillCd = tOne['BILL_CD'];
        var m_strTaxBillCd = tOne['TAXBILL_CD'];
        var strInDate = tOne['INVOICE_DATE'];

        var tSQLArray : any[] = [];

        var sql1 : string =  `
            select * from ksv_bill_mst where  bill_cd = '${tOne['BILL_CD']}'
        `;
        var obj10 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql1));
        var obj1: any = { ...obj10[0] };

        var sql2 : string =  `
            select * from kcd_gw_taxbill_kr where taxbill_cd = '${tOne['TAXBILL_CD']}'
        `;
        var obj20 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql2));
        var obj2: any = { ...obj20[0] };
        var m_strCurrCd  = obj2['CURR_CD'];

        var sqlVendor : string =  `
            select * from kcd_vendor where vendor_cd = '${obj2['VENDOR_CD']}'
        `;
        var objVendors : any[]  =  await prisma.$queryRaw(Prisma.raw(sqlVendor));
        var objVendor : any  =  { ...objVendors[0] };

        var sql3 : string =  `
            select isnull(max(no_docu), '00000')  as max_doc
            from neoe_fi_adocu 
            where no_docu like 'DM${tRetDate1}%'
        `;
        var obj3 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql3));
        var tMaxSeq = 1;
        if (obj3.length > 0)  {
           var tStr = obj3[0]['max_doc'];
           if (tStr === '00000') tMaxSeq = 1;
           else tMaxSeq = parseInt(tStr.substring(10, 15)) + 1;
        }
        console.log(`max seq: ${tMaxSeq}`);

        var sql4 : string =  `
            select * 
            from kcd_currency 
            where curr_cd = '${m_strCurrCd}' 
            and  start_date = '${tRetDate1}' 
        `;
        var obj4 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql4));
        if (obj4.length <= 0) {
            console.log('작업일의 환율정보가 없습니다: ');
            continue;
        }
        var objCurrency : any = { ...obj4[0] };
        console.log(objCurrency);
 
        if (objVendor['NEOE_NO'] === '') {
            console.log('Vendor에 더존코드 없음: ' + objVendor['NEOE_NO']);
            continue;
        }

        console.log(`=======================================================`);

        var m_strPurApp = obj2['PUR_APP'];
        var m_strTTFlag = obj2['TT_FLAG'];
        var m_strNeoeCd = '';
        var m_strTaxAmt = parseFloat(obj1['VAT_AMT']);
        // var m_strTotAmt = parseFloat(obj1['PAY_AMT']) + parseFloat(obj1['VAT_AMT']);
        var m_strTotAmt = parseFloat(obj1['PAY_AMT']);
        var m_strTotal = parseFloat(obj1['PAY_AMT']) - parseFloat(obj1['VAT_AMT']);
        var m_strVendorCd = obj2['VENDOR_CD'];
        var m_strPayDate = obj2['PAY_DATE'];
        var m_strCurrCd  = obj2['CURR_CD'];
        var m_strApproKey = obj1['APPRO_KEY'];
        var m_strTaxDate = obj2['REG_DATETIME'].substring(0, 8);
        var m_strBillDate = tRetDate1;
        var m_TaxAdd  = obj1['TAX_KIND'];  // 1:과세, 2: 영세, 3: 면세, 4: TT
        var taxAdd = true;
        var tTaxCd = '0';
        if (obj1['TAX_KIND'] === '1') tTaxCd = '3';
        if (obj1['TAX_KIND'] === '2') tTaxCd = '2';
        if (obj1['TAX_KIND'] === '3') tTaxCd = '1';
        if (obj1['TAX_KIND'] === '4') tTaxCd = '4';
        if (tTaxCd === '0') {
           if (m_strPurApp === 'O' && m_strTTFlag === '1') tTaxCd = '1';  // 면세
           if (m_strPurApp === 'O' && m_strTTFlag !== '1') tTaxCd = '2';  // 영세
           if (m_strPurApp === 'X' && m_strTTFlag !== '1') tTaxCd = '3';  // 과세 
           if (m_strPurApp === 'X' && m_strTTFlag === '1') tTaxCd = '4';  // TT 
        }

        ////
        var strPartner = m_strVendorCd;

        var strDocuDate = m_strPayDate;
        var strBillDate = m_strBillDate;

        var strCurrCd = '';
        var strCurrNeoe = '';
        if (m_strCurrCd === 'KRW') strCurrCd = '25101';
        else if (m_strCurrCd === 'USD') {
            strCurrNeoe = '001';
            if (m_strTaxAmt <= 0) {
                if (m_strPurApp === 'O') strCurrCd = '25102';
                else strCurrCd = '25101';
            } else {
                strCurrCd = '25101';
            } 
        }
        else if (m_strCurrCd === 'JPY') {
            strCurrCd = '25101';
            strCurrNeoe = '002';
        }
        else if (m_strCurrCd === 'EUR') {
            strCurrNeoe = '003';
            if (m_strTaxAmt <= 0) {
                if (m_strPurApp === 'O') strCurrCd = '25102';
                else strCurrCd = '25101';
            } else {
                strCurrCd = '25101';
            } 
        }

        var strTaxCd = '';
        var strTaxNm = '';
        var strCdAcct = '';
        var strLocCd = '';
        var strLocNm = '';
          
        if (tTaxCd === '1') {
            strTaxCd = '26';
            strTaxNm = '면세(계산서)';
            strCdAcct = '15400';
            strLocCd  = '100';
            strLocNm  = '국내';
        }
        if (tTaxCd === '2') {
            strTaxCd = '23';
            strTaxNm = '영세(세금계산서)';
            strCdAcct = '15400';
            strLocCd  = '100';
            strLocNm  = '국내';
        }
        if (tTaxCd === '3') {
            strTaxCd = '21';
            strTaxNm = '과세(세금계산서)';
            strCdAcct = '15400';
            strLocCd  = '100';
            strLocNm  = '국내';
        }
        if (tTaxCd === '4') { // 해외송금
            strTaxCd = '26';
            strTaxNm = '면세(세금계산서)';
            strCdAcct = '15400';
            strLocCd  = '200';
            strLocNm  = '해외';
            strCurrCd = '25102';
            taxAdd = false;
        }

        var strRegNo = objVendor['REG_NO'];
        strRegNo = strRegNo.replace(/-/gi, '');
        var strNeoeAgentName = objVendor['VENDOR_NAME'];
        var strNeoeAgentCd = objVendor['NEOE_NO'];
        var strDocType = m_strApproKey;
        var strVendorMatlType = objVendor['VENDOR_MATL_TYPE'];

        var strNeoeNo = objVendor['NEOE_NO'];
        var strVendorName = objVendor['VENDOR_NAME'];
        var strMatlType = '';
        var strRemark = '';

        if (taxAdd) {
            if (strVendorMatlType === 'M') {
                strMatlType = '100';   
                strRemark = '국내자재_원자재';
            }
            if (strVendorMatlType === 'S') {
                strMatlType = '300';   
                strRemark = '국내자재_부자재';
            }
            if (strDocType.substring(0, 2) === 'DM') {
                strRemark += '/즉시결제';
            }
            if (strDocType.substring(0, 2) === 'ND') {
                strRemark += '/월마감';
            }
        } else {
            if (strVendorMatlType === 'M') {
                strMatlType = '100';   
            }
            if (strVendorMatlType === 'S') {
                strMatlType = '300';   
            }
            strRemark = '수입원재료';
        }

        var amountSum = m_strTotAmt; 
        if (m_strCurrCd === 'KRW')  amountSum = parseInt(String(m_strTotAmt));


        ////
        let sql20 = `
             select cd_sysdef
             -- from neoe.neoe.ma_codedtl
             from NEOE_MA_CODEDTL
             where cd_field='MA_B000005'
             -- and cd_company = '1000'
             and nm_sysdef = '${m_strCurrCd}'
              `;
        var tRet20 = await prisma.$queryRaw(Prisma.raw(sql20));
        var strNeoeCurrCd  = '';
        if (tRet20.length > 0) strNeoeCurrCd = tRet20[0].cd_sysdef;

        ///
        let sql21 = `
             select rate_base
             -- from neoe.neoe.ma_exchange
             from neoe_ma_exchange
             where curr_sour = '${strNeoeCurrCd}'
             -- and   yymmdd = '${strDocuDate}'
              `;
        var tRet21 = await prisma.$queryRaw(Prisma.raw(sql21));
        var m_strRateBase = '0';
        if (tRet21.length > 0) m_strRateBase = tRet21[0].rate_base;

        ///
        let sql25 = `
              select cd_code,cd_name
              from kcd_code
              where cd_group = 'DOCU_MNG'
              `;
        var tRet25 = await prisma.$queryRaw(Prisma.raw(sql25));
        var strMngPart = '';
        var strMngId = '';
        var strMngName = '';
        var strMngEmail= '';
        var strMngTel = '';
        tRet25.forEach((col, i) => {
              if (col.cd_code === 'PART') strMngPart = col.cd_name;
              if (col.cd_code === 'ID') strMngId = col.cd_name;
              if (col.cd_code === 'NAME') strMngName = col.cd_name;
              if (col.cd_code === 'EMAIL') strMngEmail = col.cd_name;
              if (col.cd_code === 'TEL') strMngTel = col.cd_name;
        });

        strMngPart = '8400';
        if (tRet25.length <= 0) {
           strMngPart = '8400';
           strMngId   = '9999';
           strMngName   = 'aftest01';
           strMngEmail   = 'test@shints.com';
           strMngTel   = '000-000-0000';
        }

        var tMaxStr = AFLib.printF(tMaxSeq, 5);
        var strDocuNo = `DM${tRetDate1}${tMaxStr}`;
        var strTaxNo = strDocuNo + '001';

        var strSum = m_strTotAmt;
        var strVat = m_strTaxAmt;
        var strTot = m_strTotal;

        // m_strTaxAmt : 부가세, m_strTotAmt : 부가세 포함금액
        if (strTaxCd === '23' || strTaxCd === '26') {
            m_strTaxAmt = 0;
        } else [
            m_strTaxAmt = m_strTotAmt * 0.1;
        }
        var strTotAmt = m_strTotAmt;
        var strTaxAmt = m_strTaxAmt;
        var strTotalAmt = strTotAmt + strTaxAmt;
        var strRateBase = objCurrency.WON_AMT;

        if (m_strCurrCd !== 'KRW') {
            strTotAmt = parseInt(String(strTotAmt * objCurrency.WON_AMT));
            strTaxAmt = parseInt(String(strTaxAmt * objCurrency.WON_AMT));
            strTotalAmt = parseInt(String(strTotalAmt * objCurrency.WON_AMT));
            if (m_strCurrCd !== 'JPY') {
                strSum = 0;
                strVat = 0;
                strTot = 0;
                strCurrNeoe = '';
                strRateBase = '0';
            }
        } else {
            strSum = 0;
            strVat = 0;
            strTot = 0;
        }

        var tRowNo = 1;

        // 차변 - 부가세 - 대변

        var tDocuObj : any = {};
        tDocuObj.row_id = strDocuNo;
        tDocuObj.row_no = String(tRowNo); 
        tDocuObj.no_tax = '*';
        tDocuObj.cd_pc  = '1000';
        tDocuObj.cd_wdept = strMngPart; 
        tDocuObj.no_docu =  strDocuNo; 
        tDocuObj.no_doline =  String(tRowNo);
        tDocuObj.cd_company =  '1000';
        tDocuObj.id_write = strMngId;
        tDocuObj.cd_docu =  '11';
        tDocuObj.dt_acct =  strDocuDate; 
        tDocuObj.st_docu =  '1'; 
        tDocuObj.tp_drcr =  '1';  // 차변, 대변 구분
        tDocuObj.cd_acct =  strCdAcct;
        tDocuObj.amt =  String(strTotAmt); 
        tDocuObj.cd_partner =  strNeoeAgentCd;
        tDocuObj.dt_start =  '';
        tDocuObj.dt_end = ''; 
        tDocuObj.am_taxstd =  '0';
        tDocuObj.am_addtax =  '0'; 
        tDocuObj.tp_tax =  strTaxCd;
        tDocuObj.no_company =  '';
        tDocuObj.nm_note =  strRemark; 
        tDocuObj.cd_bizarea =  '1000';
        tDocuObj.cd_cc =  '';
        tDocuObj.ucd_mng1 =  '';
        tDocuObj.ucd_mng2 =  '';
        tDocuObj.ucd_mng3 =  '';
        tDocuObj.ucd_mng4 =  '';
        tDocuObj.ucd_mng5 =  '';
        tDocuObj.tp_docu =  'N';
        tDocuObj.no_acct =  '0';
        tDocuObj.cd_exch =  strCurrNeoe; 
        tDocuObj.rt_exch =  strRateBase;     
        tDocuObj.am_ex = String(strTotAmt); 
        tDocuObj.no_to =  ''; 
        tDocuObj.dt_shipping =  '';
        tDocuObj.tp_gubun = '3';
        tDocuObj.md_tax1 =  '';
        tDocuObj.nm_item1 = ''; 
        tDocuObj.nm_size1 = ''; 
        tDocuObj.qt_tax1 = '0'; 
        tDocuObj.am_prc1 = '0'; 
        tDocuObj.am_supply1 = '0';
        tDocuObj.am_tax1 =  '0';
        tDocuObj.nm_note1 = ''; 
        tDocuObj.cd_mngd1 =  strNeoeAgentCd;
        tDocuObj.nm_mngd1 =  strNeoeAgentName; 
        tDocuObj.cd_mngd2 =  strMatlType;
        tDocuObj.nm_mngd2 =  ''; 
        tDocuObj.cd_mngd3 =  strLocCd; 
        tDocuObj.nm_mngd3 =  strLocNm;
        tDocuObj.cd_mngd4 =  '';
        tDocuObj.nm_mngd4 =  '';
        tDocuObj.cd_mngd5 =  '';
        tDocuObj.nm_mngd5 =  '';
        tDocuObj.cd_mngd6 =  ''; 
        tDocuObj.nm_mngd6 =  String(strTotAmt); 
        tDocuObj.cd_mngd7 =  ''; 
        tDocuObj.nm_mngd7 =  ''; 
        tDocuObj.cd_mngd8 =  ''; 
        tDocuObj.nm_mngd8 =  ''; 
        tDocuObj.yn_iss = '0'; 
        tDocuObj.final_status =  '00';
        tDocuObj.no_bill = ''; 
        var tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tDocuObj);
        var tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);

        if (strTaxAmt > 0) {  /// 부가세대급금 전표 계정코드 13500
            tRowNo += 1;
           
            tDocuObj = {};
            tDocuObj.row_id = strDocuNo;
            tDocuObj.row_no = String(tRowNo); 
            tDocuObj.no_tax = strTaxNo;
            tDocuObj.cd_pc  = '1000';
            tDocuObj.cd_wdept = strMngPart; 
            tDocuObj.no_docu =  strDocuNo; 
            tDocuObj.no_doline =  String(tRowNo);
            tDocuObj.cd_company =  '1000';
            tDocuObj.id_write = strMngId;
            tDocuObj.cd_docu =  '11';
            tDocuObj.dt_acct =  strDocuDate; 
            tDocuObj.st_docu =  '1'; 
            tDocuObj.tp_drcr =  '1';
            tDocuObj.cd_acct =  '13500';   // strCdAcct
            tDocuObj.amt =  strTaxAmt; 
            tDocuObj.cd_partner =  strNeoeAgentCd;
            tDocuObj.dt_start =  strBillDate;
            tDocuObj.dt_end = ''; 
            tDocuObj.am_taxstd =  strTotAmt;
            tDocuObj.am_addtax =  strTaxAmt; 
            tDocuObj.tp_tax =  strTaxCd;
            tDocuObj.no_company =  strRegNo; 
            tDocuObj.nm_note =  strRemark; 
            tDocuObj.cd_bizarea =  '1000';
            tDocuObj.cd_cc =  '';
            tDocuObj.ucd_mng1 =  '';
            tDocuObj.ucd_mng2 =  '';
            tDocuObj.ucd_mng3 =  '';
            tDocuObj.ucd_mng4 =  '';
            tDocuObj.ucd_mng5 =  '';
            tDocuObj.tp_docu =  'N';
            tDocuObj.no_acct =  '0';
            tDocuObj.cd_exch =  strCurrNeoe; 
            tDocuObj.rt_exch =  strRateBase;     
            tDocuObj.am_ex = strTaxAmt; 
            tDocuObj.no_to =  ''; 
            tDocuObj.dt_shipping =  '';
            tDocuObj.tp_gubun = '3';
            tDocuObj.md_tax1 =  '';
            tDocuObj.nm_item1 = ''; 
            tDocuObj.nm_size1 = ''; 
            tDocuObj.qt_tax1 = '1'; 
            tDocuObj.am_prc1 = '0'; 
            tDocuObj.am_supply1 = '0';
            tDocuObj.am_tax1 =  '0';
            tDocuObj.nm_note1 = ''; 
            tDocuObj.cd_mngd1 =  strNeoeAgentCd;
            tDocuObj.nm_mngd1 =  strNeoeAgentName; 
            tDocuObj.cd_mngd2 =  strTaxCd;
            tDocuObj.nm_mngd2 =  strTaxNm; 
            tDocuObj.cd_mngd3 =  ''; 
            tDocuObj.nm_mngd3 =  tRetDate1;
            tDocuObj.cd_mngd4 =  '';
            tDocuObj.nm_mngd4 =  strDocuDate;
            tDocuObj.cd_mngd5 =  '';
            tDocuObj.nm_mngd5 =  '';
            tDocuObj.cd_mngd6 =  ''; 
            tDocuObj.nm_mngd6 =  ''; 
            tDocuObj.cd_mngd7 =  ''; 
            tDocuObj.nm_mngd7 =  ''; 
            tDocuObj.cd_mngd8 =  ''; 
            tDocuObj.nm_mngd8 =  ''; 
            tDocuObj.yn_iss = '0'; 
            tDocuObj.final_status =  '00';
            tDocuObj.no_bill = ''; 
            tDocuObj.sell_dam_nm = strMngName; 
            tDocuObj.sell_dam_email = strMngEmail; 
            tDocuObj.sell_dam_mobil = strMngTel; 

            tSQL99  = AFLib.createTableSql('neoe_fi_adocu', tDocuObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
        }

        //
        tRowNo += 1;
        tDocuObj = {};
        tDocuObj.row_id = strDocuNo;
        tDocuObj.row_no = String(tRowNo); 
        tDocuObj.no_tax = '*';
        tDocuObj.cd_pc  = '1000';
        tDocuObj.cd_wdept = strMngPart; 
        tDocuObj.no_docu =  strDocuNo; 
        tDocuObj.no_doline =  String(tRowNo);
        tDocuObj.cd_company =  '1000';
        tDocuObj.id_write = strMngId;
        tDocuObj.cd_docu =  '11';
        tDocuObj.dt_acct =  strDocuDate; 
        tDocuObj.st_docu =  '1'; 
        tDocuObj.tp_drcr =  '2';
        tDocuObj.cd_acct =  strCurrCd; // strCdAcct
        tDocuObj.amt =  String(strTotalAmt); 
        tDocuObj.cd_partner =  strNeoeAgentCd;
        tDocuObj.dt_start =  '';
        tDocuObj.dt_end = m_strPayDate; 
        tDocuObj.am_taxstd =  '0';
        tDocuObj.am_addtax =  '0'; 
        tDocuObj.tp_tax =  strTaxCd;
        tDocuObj.no_company =  '';
        tDocuObj.nm_note =  strRemark; 
        tDocuObj.cd_bizarea =  '1000';
        tDocuObj.cd_cc =  strNeoeAgentCd;
        tDocuObj.ucd_mng1 =  '';
        tDocuObj.ucd_mng2 =  '';
        tDocuObj.ucd_mng3 =  '';
        tDocuObj.ucd_mng4 =  '';
        tDocuObj.ucd_mng5 =  '';
        tDocuObj.tp_docu =  'N';
        tDocuObj.no_acct =  '0';
        tDocuObj.cd_exch =  strCurrNeoe; 
        tDocuObj.rt_exch =  strRateBase;     
        tDocuObj.am_ex = String(strTotalAmt); 
        tDocuObj.no_to =  ''; 
        tDocuObj.dt_shipping =  '';
        tDocuObj.tp_gubun = '3';
        tDocuObj.md_tax1 =  '';
        tDocuObj.nm_item1 = ''; 
        tDocuObj.nm_size1 = ''; 
        tDocuObj.qt_tax1 = '0'; 
        tDocuObj.am_prc1 = '0'; 
        tDocuObj.am_supply1 = '0';
        tDocuObj.am_tax1 =  '0';
        tDocuObj.nm_note1 = ''; 
        tDocuObj.cd_mngd1 =  strNeoeAgentCd;
        tDocuObj.nm_mngd1 =  strNeoeAgentName; 
        tDocuObj.cd_mngd2 =  strMatlType;
        tDocuObj.nm_mngd2 =  ''; 
        tDocuObj.cd_mngd3 =  ''; 
        tDocuObj.nm_mngd3 =  '';
        tDocuObj.cd_mngd4 =  '';
        tDocuObj.nm_mngd4 =  '';
        tDocuObj.cd_mngd5 =  '';
        tDocuObj.nm_mngd5 =  '';
        tDocuObj.cd_mngd6 =  ''; 
        tDocuObj.nm_mngd6 =  ''; 
        tDocuObj.cd_mngd7 =  ''; 
        tDocuObj.nm_mngd7 =  ''; 
        tDocuObj.cd_mngd8 =  ''; 
        tDocuObj.nm_mngd8 =  ''; 
        tDocuObj.yn_iss = '0'; 
        tDocuObj.final_status =  '00';
        tDocuObj.no_bill = ''; 

        tSQL99  = AFLib.createTableSql('neoe_fi_adocu', tDocuObj);
        tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);

        tSQL99 = ` 
               update ksv_stock_in set 
                      buy_date = '${strBillDate}'
               where  stsin_cd in (select stsin_cd from ksv_stock_mem2_stsin where bill_cd = '${tBillCd}')
               `;
        tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);

        tSQL99 = ` 
               update ksv_stock_mem2_stsin set 
                      buy_date = '${strBillDate}'
               where  bill_cd = '${tBillCd}'
               `;
        tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);

        tSQL99 = ` 
               update ksv_dc_amount set 
                      buy_date = '${strBillDate}'
               where  bill_cd = '${tBillCd}'
               `;
        tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);

        tSQL99 = ` 
               update ksv_bill_mst set 
                      docu_no = '${strDocuNo}',
                      buy_date = '${strBillDate}'
               where  bill_cd = '${tBillCd}'
               `;
        tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
        tSQLArray.push(tSQL99_1);

        var sql5 : string =  `
              select distinct po_cd from ksv_stock_mem2_stsin where bill_cd = '${tBillCd}'
        `;
        var obj5 : any[]  =  await prisma.$queryRaw(Prisma.raw(sql5));
        var tIdx5 = 0;
        for (tIdx5 = 0; tIdx5 < obj5.length; tIdx5 ++) {
            var tOne1 =  { ...obj5[tIdx5] };
            var tAppDataObj : any = {};
            tAppDataObj.po_cd = tOne1;
            tAppDataObj.pay_date = m_strPayDate;
            tAppDataObj.taxbill_date = m_strPayDate;
            tAppDataObj.buy_date = strBillDate;
            tAppDataObj.in_date = strInDate;
            tAppDataObj.pay_curr_cd = strCurrCd;
            tAppDataObj.vendor_cd = m_strVendorCd;
            tAppDataObj.neoe_no = strDocuNo;
            tAppDataObj.amount = String(strTotalAmt);
            tAppDataObj.neoe_line= '1';
            tAppDataObj.taxbill_cd =  m_strTaxBillCd;
            tAppDataObj.reg_user =  'aftest01';
            tAppDataObj.bill_cd =  tBillCd;
            tAppDataObj.stsout_cd =  '';
            tAppDataObj.stsin_cd =  '';

            tSQL99  = AFLib.createTableSql('kcd_app_data', tAppDataObj);
            tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
            tSQLArray.push(tSQL99_1);
        }

        try {
            await prisma.$transaction(tSQLArray);
        } catch(e : any) {
            console.log(`ERROR : ${e['message']}`);
        }

    }

}

var tPuCd = process.argv[2];
process1(tPuCd);

