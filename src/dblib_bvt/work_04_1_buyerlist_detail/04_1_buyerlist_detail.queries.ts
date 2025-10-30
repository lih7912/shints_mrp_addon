
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_04_1_buyerlist_detail = {
  Query: {
    mgrQueryS0BVT_04_1_buyerlist_detail : async (_, args) => {
       var tSQL = '';
       if (args.data.BUYER_CD !== '') {
           tSQL += `WHERE A.BUYER_CD  like '%${args.data.BUYER_CD}%' `;
       }
       let sqlStr = `

SELECT 
A.BUYER_CD,
I.CREDIT_RATING,
A.BUYER_NAME,
A.BUYER_ABBR,
A.USER_NAME,
A.EMAIL,
A.TEL_NO,
A.FAX_NO,
D.NAT_NAME,
A.ZIP_NO,
A.ADDR1,
A.ADDR2,
B.CD_NAME AS STATUS_NAME,
A.COMM_FLAG,
G.CD_NAME AS BUYER_TEAM_NAME,
C.CD_NAME AS LOSS_FLAG_NAME,
H.REMARK,I.CREDIT_EXPIRE 
FROM 
   KCD_BUYER A
   LEFT JOIN KCD_CODE B ON B.CD_GROUP = 'STATUS_CD' AND B.CD_CODE = A.STATUS_CD
   LEFT JOIN KCD_CODE C ON C.CD_GROUP = 'LOSS_FLAG' AND C.CD_CODE = A.LOSS_FLAG 
   LEFT JOIN KCD_CODE G ON G.CD_GROUP = 'BUYER_TEAM' AND G.CD_CODE = A.BUYER_TEAM 
   LEFT JOIN KCD_NATION D ON D.NAT_CD = A.NAT_CD 
   LEFT JOIN KCD_BANK E ON E.BANK_CD = A.BANK_CD
   LEFT JOIN KCD_USER F ON F.USER_ID = A.SHINTS_USER
   LEFT JOIN KCD_PAY_RULE H ON H.CD_CODE = ISNULL(A.PAY_RULE,'') 
   LEFT JOIN KCD_BUYER_CREDIT_RATING I ON  I.BUYER_CD = A.BUYER_CD
        AND I.REG_DATETIME = (SELECT MAX(REG_DATETIME) FROM KCD_BUYER_CREDIT_RATING WHERE BUYER_CD=A.BUYER_CD)
   LEFT JOIN KSV_ORDER_MST J ON LEFT(J.ORDER_CD,2)=A.BUYER_CD 
${tSQL}


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       BUYER_CD:'', 
       CREDIT_RATING:'', 
       BUYER_NAME:'', 
       BUYER_ABBR:'', 
       USER_NAME:'', 
       EMAIL:'', 
       TEL_NO:'', 
       FAX_NO:'', 
       NAT_NAME:'', 
       ZIP_NO:'', 
       ADDR1:'', 
       ADDR2:'', 
       STATUS_NAME:'', 
       COMM_FLAG:'', 
       BUYER_TEAM_NAME:'', 
       LOSS_FLAG_NAME:'', 
       REMARK:'', 
       CREDIT_EXPIRE:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_04_1_buyerlist_detail; 
