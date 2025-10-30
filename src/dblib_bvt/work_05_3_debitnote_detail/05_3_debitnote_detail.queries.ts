
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_05_3_debitnote_detail = {
  Query: {
    mgrQueryS0BVT_05_3_debitnote_detail : async (_, args) => {
       var tSQL = '';
       if (args.data.CRDB_CD !== '') {
           tSQL += `WHERE A.CRDB_CD =  '${args.data.CRDB_CD}' `;
       }
       let sqlStr = `

SELECT 
  A.CRDB_CD,
  A.CRDB_SEQ, 
  A.CRDB_DATE, 
  B.BUYER_CD, 
  A.CRDB_AMT, 
  A.CRDB_AMT-ISNULL(SUM(C.CRDB_AMT),0) AS BALANCE, 
  A.CURR_CD, 
  A.TITLE, 
  A.CHARGER,
  A.CONF_FLAG, 
  A.CONF_USER,
  D.CD_NAME AS CREDIT_STATUS_NAME,
  A.REMARK, 
  A.REMARK_S ,
  E.CD_NAME AS DEBIT_TYPE_NAME,
  A.HISTORY_NO,
  A.DEBIT_BL_NO,
  A.CI_NO,
  A.TRANSPORTATION,
  A.TOT_AMT,
  A.WEIGHT,
  A.TOT_CBM,
  A.CBM,
  B.BUYER_TEAM 
FROM   
  KSV_CRDB_MST A
     LEFT JOIN KCD_CODE E ON E.CD_CODE = A.DEBIT_TYPE AND E.CD_GROUP = 'DEBIT_TYPE'
     LEFT JOIN KCD_CODE D ON D.CD_GROUP='CREDIT_STATUS' AND D.CD_CODE=A.STATUS_CD
     LEFT JOIN KSV_CRDB_MEM C ON C.CRDB_CD = A.CRDB_CD,
  KVW_BVT_DEBIT B
${tSQL}
AND A.CRDB_SEQ = (SELECT MAX(CRDB_SEQ) FROM KSV_CRDB_MST WHERE A.CRDB_CD=CRDB_CD) 
AND B.BUYER_CD = A.MESSER_CD 
GROUP BY A.CRDB_CD,A.CRDB_SEQ, A.CRDB_DATE, B.BUYER_CD, A.CRDB_AMT,C.CRDB_AMT, A.CURR_CD 
, A.TITLE, A.CHARGER,A.CONF_FLAG, A.CONF_USER,A.STATUS_CD,A.REMARK, A.REMARK_S 
,D.CD_NAME,E.CD_NAME,A.HISTORY_NO,A.DEBIT_BL_NO,A.CI_NO,A.TRANSPORTATION,A.TOT_AMT,A.WEIGHT,A.TOT_CBM,A.CBM ,A.STATUS_CD, B.BUYER_TEAM 

           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       CRDB_CD:'', 
       CRDB_DATE:'', 
       BUYER_CD:'', 
       CURR_CD:'', 
       TITLE:'', 
       CHARGER:'', 
       CONF_FLAG:'', 
       CONF_USER:'', 
       CREDIT_STATUS_NAME:'', 
       REMARK:'', 
       REMARK_S:'', 
       DEBIT_TYPE_NAME:'', 
       HISTORY_NO:'', 
       DEBIT_BL_NO:'', 
       CI_NO:'', 
       TRANSPORTATION:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_05_3_debitnote_detail; 
