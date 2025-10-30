
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_06_3_3_DelayReport = {
  Query: {
    mgrQueryS0BVT_06_3_3_DelayReport : async (_, args) => {

        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = '';
        if (mm > 9) mm_str = mm.toString();
        else  mm_str = '0' + mm;

        var dd = tDate.getDate();
        var dd_str = '';
        if (dd > 9) dd_str = dd;
        else  dd_str = '0' + dd;

        var hours = tDate.getHours();
        var hours_str = '';
        if (hours > 9) hours_str = hours.toString();
        else  hours_str = '0' + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = '';
        if (minutes > 9) minutes_str = minutes.toString();
        else  minutes_str = '0' + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = '';
        if (seconds > 9) seconds_str = seconds.toString();
        else  seconds_str = '0' + seconds;

        var yyyy = tDate.getFullYear();

        var tRetDate = yyyy.toString() + mm_str + dd_str + hours_str + minutes_str + seconds_str;
        var tRetDate1 = yyyy.toString() + mm_str + dd_str ;

        var tSQL0 = ` '${tRetDate1}' AS CURR_DATE ,`;

       var tSQL = '';
       if (args.data.PO_CD !== '') {
           tSQL += `AND E.PO_CD LIKE '%${args.data.PO_CD}%' `;
       } else {
           tSQL += `AND E.FACTORY_CD LIKE '%${args.data.FACTORY_CD}%' `;
           tSQL += `AND E.PLAN_EDT between in '${args.data.S_PLAN_ETD}' and '${args.data.S_PLAN_ETD}' `;
       }
       let sqlStr = `

				SELECT 
            ${tSQL0}  
            E.PO_CD,
            LEFT(F.ORDER_CD,2) AS BUYER_CD,
            E.PO_CONF_DATE,
            E.PLAN_ETD,
            E.PLAN_ETA,
            C.VENDOR_NAME,
            A.MATL_CD,
            B.MATL_NAME,
            B.COLOR,
            B.SPEC,
            B.UNIT,
				    SUM(F.PO_QTY) AS PO_QTY,
				    SUM(F.PO_QTY)-SUM(F.IN_QTY) AS BAL_QTY,
            A.REMARK,
            RIGHT(A.EXP_DATE,4) AS EXP_DATE_1,
            A.ETD,
            A.ETA,
            A.DELIVERY,
            A.EXP_DATE,
            A.UPD_USER 
				FROM KSV_PO_MATLLIST A
             LEFT JOIN KSV_STOCK_MEM F ON F.PO_CD = A.PO_CD  AND F.MATL_CD = A.MATL_CD ,
             KCD_MATL_MST B,KCD_VENDOR C,KSV_PO_MST E
				WHERE E.PO_STATUS = '4' 
				AND E.PO_SEQ = '1' 
        ${tSQL}
				AND E.PLAN_FLAG = '1' 
				AND A.PO_CD = E.PO_CD 
				AND B.MATL_CD = A.MATL_CD 
				AND C.VENDOR_CD = B.VENDOR_CD 
				GROUP BY E.PO_CD,E.PO_CONF_DATE,E.PLAN_ETD,E.PLAN_ETA,C.VENDOR_NAME,B.MATL_NAME,B.COLOR,B.SPEC,B.UNIT,A.MATL_CD,A.TOT_CNT,A.STOCK_QTY,LEFT(F.ORDER_CD,2),A.REMARK, RIGHT(A.EXP_DATE,4),A.ETD,A.ETA,A.DELIVERY,A.UPD_USER,A.EXP_DATE 
				HAVING SUM(F.PO_QTY) > SUM(F.IN_QTY) 
				AND SUM(F.PO_QTY)- SUM(F.IN_QTY) > 0 AND SUM(F.PO_QTY)>0 
				ORDER BY E.PO_CD,C.VENDOR_NAME,B.MATL_NAME,B.SPEC,B.COLOR 

           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       PO_CD:'', 
       BUYER_CD:'', 
       PO_CONF_DATE:'', 
       PLAN_ETD:'', 
       PLAN_ETA:'', 
       VENDOR_NAME:'', 
       MATL_CD:'', 
       MATL_NAME:'', 
       COLOR:'', 
       SPEC:'', 
       UNIT:'', 
       PO_QTY:0, 
       BAL_QTY:0, 
       REMARK:'', 
       EXP_DATE:'', 
       ETD:'', 
       ETA:'', 
       DELIVERY:'', 
       EXP_DATE:'', 
       UPD_USER:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 

       for (tIdx = 0; tIdx < tRet.length; tIdx ++) {
          var tOne = tRet[tIdx];
          let sqlStr1 = `

				select d.ship_qty,d.cut_date,d.etd,d.eta,
				       d.delay_reason,d.delivery_type,d.fare_type,d.remark,d.ex_in_date 
				from kzz_matl_delay d 
				where d.seq = (SELECT SYS_VAL FROM KCD_SYSTEM WHERE SYS_CD = 'MatlDelaySeq') 
				and d.po_cd = '${tOne.PO_CD}' 
				and d.matl_cd = '${tOne.MATL_CD}'

           `;
           var tRet1  =  await prisma.$queryRaw(Prisma.raw(sqlStr1));
           if (tRet1.length > 0) {
              var tRet2 = tRet1[0];
              tOne.SHIP_QTY = tRet2.ship_qty;
              tOne.CUT_DATE = tRet2.cut_date;
              tOne.ETD1 = tRet2.etd;
              tOne.ETA1 = tRet2.eta;
              tOne.DELAY_REASON = tRet2.delay_reason;
              tOne.DELIVERY_TYPE = tRet2.delivery_type;
              tOne.FARE_TYPE = tRet2.fare_type;
              tOne.REMARK1 = tRet2.remark;
              tOne.EX_IN_DATE = tRet2.ex_in_date;
           } else {
              tOne.SHIP_QTY = 0;
              tOne.CUT_DATE = '';
              tOne.ETD1 = '';
              tOne.ETA1 = '';
              tOne.DELAY_REASON = '';
              tOne.DELIVERY_TYPE = '';
              tOne.FARE_TYPE = '';
              tOne.REMARK1 = '';
              tOne.EX_IN_DATE = '';
           } 
           tRetArray.push(tOne);
       }

       return (tRetArray);
    },
  },
};

export default moduleQueryS0BVT_06_3_3_DelayReport; 
