1. shints604. AutoBill참고

1) 전표생성 :  lkj83(user_id), part (AC) / 재경팀 담당자만 처리 가능

   //
   m_strPuApp purapp O/X
   m_strTTflag ttflag T/T : empty
   m_strNeoeCd neoecd FIxxxx: empty
   m_strTotAmt 합계금액
   m_strWithoutTax : 부가세 뺀금액
   m_strVendorCd : 벤더코드
   m_strPayDate : 결제일
   m_strVendorCd1: 벤더코드
   m_strCurrCd  
   m_strApproKey : 결제코드
   m_strTaxDate: 세금계산서 날자
   m_strBillDate : 결제일

   strPartner = m_strVendorCd

   TaxCd =0
     // 면세 1:  P= O, T = O
     // 영세 2:  P= O , T = X // usd만 그대로 나머전 KrW
     // 과세 3:  P = X, T = X
     // 해송(해외송금) 4: P=X, T= O
   taxAdd = true;

   strRegdatetime
   strDocuDate = m_strPayDate (결제일)
   strBillDate = m_strBillDate
   
   strCurrCd = '';
   strCurrNeoe = '';
   if (m_strCurrCd = 'KRW')  strCurrCd = '25101' 
   if (m_strCurrCd = 'USD')  {
       strCurrNeoe = '001' 
       if (m_strTaxAmt = 0) {
           if (m_strPurApp = 'O') strCurrCd = '25102'
           else strCurrCd = '25101'
       } else {
           strCurrCd = '25101'
       }
   }
   if (m_strCurrCd = 'JPY')  {
       strCurrNeoe = '002' 
       strCurrCd = '25101'
   }
   if (m_strCurrCd = 'EUR')  {
       strCurrNeoe = '003' 
       if (m_strTaxAmt = 0) {
           if (m_strPurApp = 'O') strCurrCd = '25102'
           else strCurrCd = '25101'
       } else {
           strCurrCd = '25101'
       }
    } 
    그외 통화 에러
  
    if (TaxCd = 1) { // 면세
       strTaxCd = '26'
       strTaxNm = '면세(계산서)'
       strCdAcct = '15400'
       strLocCd = '100'
       strLocNm = '국내'
    }
    if (TaxCd = 2) { // 영세
       strTaxCd = '23'
       strTaxNm = '영세(계산서)'
       strCdAcct = '15400'
       strLocCd = '100'
       strLocNm = '국내'
    }
    if (TaxCd = 3) { // 과세
       strTaxCd = '21'
       strTaxNm = '과세(계산서)'
       strCdAcct = '15400'
       strLocCd = '100'
       strLocNm = '국내'
    }
    if (TaxCd = 4) { // 해외송금 
       strTaxCd = '26'
       strTaxNm = '면세(계산서)'
       strCdAcct = '15400'
       strCurrCd = '25102'
       strLocCd = '200'
       strLocNm = '수입'
       taxAdd = false
    }

    ======================================
     select REG_NO , VENDOR_NAME, isnull(NEOE_NO, '') as NEOE_NO, vendor_matl_type 
     from kcd_vendor 
     where vendor_cd = '${strPartner}'

     if (NEOE_NO === '') 더존코드 에러
     strRegNo = REG_NO.replace('-', '')
     strNeoeAgentName = VENDOR_NAME
     strNeoeAgentCd = NEOE_NO 
     strDocType = m_strAppKey
     m_VendorMatlType = vendor_matl_type

     if (taxAdd) {
         if (m_VendorMatlType === 'M') {
             strMatlType = '100';
             strRemark = '국내자재_원자재';
         }
         if (m_VendorMatlType === 'S') {
             strMatlType = '300';
             strRemark = '국내자재_부자재';
         }
         if (strDocType.substring(0, 2) === 'DM') { // 국내결제 자재
             strRemark += '/즉시결제';
         }
         if (strDocType.substring(0, 2) === 'ND') { // 국내결제 자재
             strRemark += '/월마감';
         }
     } else {
         if (m_VendorMatlType === 'M') strMatlType = '100';
         if (m_VendorMatlType === 'S') strMatlType = '300';
         strRemark = '수입원재료';
     }

     strSum = m_strTotal // 국내의 경우 소수점 버림, 그외 소수점2자리

     strMngPart = '8400'
     strMngId = m_strEmpNo;
     strMngName = m_strUserName;
     strMngEmail = m_strEmail;
     strMngTel = m_strTelNo;

     // 전표번호 생성: 
          let sql7 = `
              select isnull(max(no_docu),'00000') as max_seq
              -- from neoe.neoe.fi_adocu
              from neoe_fi_adocu
              where no_docu like 'DM${strDocuDate}%'
              `;
          var tRet7 = await prisma.$queryRaw(Prisma.raw(sql7));
          var tMaxDocuNo = 1;
          if (tRet7[0].max_seq === '00000') {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq) + 1;
          } else {
            tMaxDocuNo = parseFloat(tRet7[0].max_seq.substring(10, 15)) + 1;
          }
          var strMaxDocuNo = AFLib.printF(tMaxDocuNo, 5);
          var strDocuNo = `DM${strDocuDate}${strMaxDocuNo}`;

      strTaxNo = strDocuNo + '001';

      if (strTaxCd === '23' || strTaxCd === '26') {
          strVat = 0;
          strTot = strSum // 부가세 포함금액
      } else {
          strVat = strSum * 0.1
          strTot = strSum + strVat;
      }

     //////////////////////////////////////////////////
     if (m_strCurrCd != 'KRW') {
        select rate_base 
        from neoe.neoe.ma_exchange 
        where yymmdd = '${strDocuDate}' 
        and curr_sour = '${strCurrNeoe}' 

        strRateBase 

        strTotAmt = strSum * strRateBase 
        strTotVat = strVat * strRateBase
        strTotTot = strSum + strVat;

     } else {
        strRateBase = '0'
        strTotAmt = strSum 
        strTotVat = strVat
        strTotTot = strSum + strVat;
        strSum = '0';
        strVat = '0';
        strTot = '0';
     }

     if (m_strCurrCd = 'JPY') {
        strSum = '0';
        strVat = '0';
        strTot = '0';
        strCurrNeoe = '';
        strRateBase = '0';
     }


          var tInObj = {};
          tInObj.row_id = strDocuNo;
          tInObj.row_no = '1';
          tInObj.no_tax = '*';
          tInObj.cd_pc = '1000';
          tInObj.cd_wdept = strMngPart;
          tInObj.no_docu = strDocuNo;
          tInObj.no_doline = '1';
          tInObj.cd_company = '1000';
          tInObj.id_write = strMngId;
          tInObj.cd_docu = '11';
          tInObj.dt_acct = strDocuDate;
          tInObj.st_docu = '1';
          tInObj.tp_drcr = '1';
          tInObj.cd_acct = strCdAcct;
          tInObj.amt = strTotAmt;
          tInObj.cd_partner = strNeoeAgentCd;
          tInObj.dt_start = '';
          tInObj.dt_end = '';
          tInObj.am_taxstd = '0';
          tInObj.am_addtax = '0';
          tInObj.tp_tax = strTaxCd;
          tInObj.no_company = '';
          tInObj.nm_note = strRemark;
          tInObj.cd_bizarea = '1000';
          tInObj.cd_cc = '';
          tInObj.ucd_mng1 = '';
          tInObj.ucd_mng2 = '';
          tInObj.ucd_mng3 = '';
          tInObj.ucd_mng4 = '';
          tInObj.ucd_mng5 = '';
          tInObj.tp_docu = 'N';
          tInObj.no_acct = '0';
          tInObj.cd_exch = strCurrNeoe; 
          tInObj.rt_exch = strRateBase;
          tInObj.am_ex = strSum;
          tInObj.no_to = '';
          tInObj.dt_shipping = '';
          tInObj.tp_gubun = '3';
          tInObj.md_tax1 = '';
          tInObj.nm_item1 = '';
          tInObj.nm_size1 = '';
          tInObj.qt_tax1 = '0';
          tInObj.am_prc1 = '0';
          tInObj.am_supply1 = '0';
          tInObj.am_tax1 = '0';
          tInObj.nm_note1 = '';
          tInObj.cd_mngd1 = strNeoeAgentCd;
          tInObj.nm_mngd1 = strNeoeAgentName;
          tInObj.cd_mngd2 = strMatlType;
          tInObj.nm_mngd2 = '';
          tInObj.cd_mngd3 = strLocCd;
          tInObj.nm_mngd3 = strLocNm;
          tInObj.cd_mngd4 = '';
          tInObj.nm_mngd4 = '';
          tInObj.cd_mngd5 = '';
          tInObj.nm_mngd5 = ''; 
          tInObj.cd_mngd6 = '';
          tInObj.nm_mngd6 = strTotAmt;
          tInObj.cd_mngd7 = '';
          tInObj.nm_mngd7 = '';
          tInObj.cd_mngd8 = '';
          tInObj.nm_mngd8 = '';
          tInObj.yn_iss = '0';
          tInObj.final_status = '00';
          tInObj.no_bill = ''
          let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
          const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
          tSQLArray.push(tSQL99_1);

          // 부가세
          tInObj = {};
          tInObj.row_id = strDocuNo;
          tInObj.row_no = '2';
          tInObj.no_tax = strTaxNo;
          tInObj.cd_pc = '1000';
          tInObj.cd_wdept = strMngPart;
          tInObj.no_docu = strDocuNo;
          tInObj.no_doline = '1';
          tInObj.cd_company = '1000';
          tInObj.id_write = strMngId;
          tInObj.cd_docu = '11';
          tInObj.dt_acct = strDocuDate;
          tInObj.st_docu = '1';
          tInObj.tp_drcr = '1';
          tInObj.cd_acct = '13500';
          tInObj.amt = strTotVat;
          tInObj.cd_partner = strNeoeAgentCd;
          tInObj.dt_start = strBillDate;
          tInObj.dt_end = '';
          tInObj.am_taxstd = strTotAmt;
          tInObj.am_addtax = strTotVat;
          tInObj.tp_tax = strTaxCd;
          tInObj.no_company = strRegNo;
          tInObj.nm_note = strRemark;
          tInObj.cd_bizarea = '1000';
          tInObj.cd_cc = '';
          tInObj.ucd_mng1 = '';
          tInObj.ucd_mng2 = '';
          tInObj.ucd_mng3 = '';
          tInObj.ucd_mng4 = '';
          tInObj.ucd_mng5 = '';
          tInObj.tp_docu = 'N';
          tInObj.no_acct = '0';
          tInObj.cd_exch = strCurrNeoe; 
          tInObj.rt_exch = strRateBase;
          tInObj.am_ex = strVat;
          tInObj.no_to = '';
          tInObj.dt_shipping = '';
          tInObj.tp_gubun = '3';
          tInObj.md_tax1 = '';
          tInObj.nm_item1 = '';
          tInObj.nm_size1 = '';
          tInObj.qt_tax1 = '1';
          tInObj.am_prc1 = '0';
          tInObj.am_supply1 = '0';
          tInObj.am_tax1 = '0';
          tInObj.nm_note1 = '';
          tInObj.cd_mngd1 = strNeoeAgentCd;
          tInObj.nm_mngd1 = strNeoeAgentName;
          tInObj.cd_mngd2 = strTaxCd;
          tInObj.nm_mngd2 = strTaxNm;
          tInObj.cd_mngd3 = '';
          tInObj.nm_mngd3 = tRetDate1;
          tInObj.cd_mngd4 = '';
          tInObj.nm_mngd4 = strDocuDate;
          tInObj.cd_mngd5 = '';
          tInObj.nm_mngd5 = '';
          tInObj.cd_mngd6 = '';
          tInObj.nm_mngd6 = '';
          tInObj.cd_mngd7 = '';
          tInObj.nm_mngd7 = '';
          tInObj.cd_mngd8 = '';
          tInObj.nm_mngd8 = '';
          tInObj.yn_iss = '0';
          tInObj.final_status = '00';
          tInObj.no_bill = ''
          tInObj.sell_dam_nm = strMngName
          tInObj.sell_dam_email = strMngEmail
          tInObj.sell_dam_mobil = strMngTel
          let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
          const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
          if (taxAdd ) tSQLArray.push(tSQL99_1);

          tInObj = {};
          tInObj.row_id = strDocuNo;
          tInObj.row_no = '3';
          tInObj.no_tax = '*';
          tInObj.cd_pc = '1000';
          tInObj.cd_wdept = strMngPart;
          tInObj.no_docu = strDocuNo;
          tInObj.no_doline = '3';
          tInObj.cd_company = '1000';
          tInObj.id_write = strMngId;
          tInObj.cd_docu = '11';
          tInObj.dt_acct = strDocuDate;
          tInObj.st_docu = '1';
          tInObj.tp_drcr = '2';
          tInObj.cd_acct = strCurrCd;
          tInObj.amt = strTotTot;
          tInObj.cd_partner = strNeoeAgentCd;
          tInObj.dt_start =''; 
          tInObj.dt_end = m_strPayDate;
          tInObj.am_taxstd = '0';
          tInObj.am_addtax = '0';
          tInObj.tp_tax = strTaxCd;
          tInObj.no_company = '';
          tInObj.nm_note = strRemark;
          tInObj.cd_bizarea = '1000';
          tInObj.cd_cc = strNeoeAgentCd;
          tInObj.ucd_mng1 = '';
          tInObj.ucd_mng2 = '';
          tInObj.ucd_mng3 = '';
          tInObj.ucd_mng4 = '';
          tInObj.ucd_mng5 = '';
          tInObj.tp_docu = 'N';
          tInObj.no_acct = '0';
          tInObj.cd_exch = strCurrNeoe; 
          tInObj.rt_exch = strRateBase;
          tInObj.am_ex = strTot;
          tInObj.no_to = '';
          tInObj.dt_shipping = '';
          tInObj.tp_gubun = '3';
          tInObj.md_tax1 = '';
          tInObj.nm_item1 = '';
          tInObj.nm_size1 = '';
          tInObj.qt_tax1 = '0';
          tInObj.am_prc1 = '0';
          tInObj.am_supply1 = '0';
          tInObj.am_tax1 = '0';
          tInObj.nm_note1 = '';
          tInObj.cd_mngd1 = strNeoeAgentCd;
          tInObj.nm_mngd1 = strNeoeAgentName;
          tInObj.cd_mngd2 = strMatlType;
          tInObj.nm_mngd2 = '';
          tInObj.cd_mngd3 = '';
          tInObj.nm_mngd3 = '';
          tInObj.cd_mngd4 = '';
          tInObj.nm_mngd4 = '';
          tInObj.cd_mngd5 = '';
          tInObj.nm_mngd5 = '';
          tInObj.cd_mngd6 = '';
          tInObj.nm_mngd6 = '';
          tInObj.cd_mngd7 = '';
          tInObj.nm_mngd7 = '';
          tInObj.cd_mngd8 = '';
          tInObj.nm_mngd8 = '';
          tInObj.yn_iss = '0';
          tInObj.final_status = '00';
          tInObj.no_bill = ''
          let tSQL99 = AFLib.createTableSql('neoe_fi_adocu', tInObj);
          const tSQL99_1 = prisma.$queryRaw(Prisma.raw(tSQL99));
          tSQLArray.push(tSQL99_1);
      
        
       
   
