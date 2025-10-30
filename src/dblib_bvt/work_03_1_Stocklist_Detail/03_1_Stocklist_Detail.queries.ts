
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_03_1_Stocklist_Detail = {
  Query: {
    mgrQueryS0BVT_03_1_Stocklist_Detail : async (_, args) => {
       var tSQL = '';
       if (args.data.MATL_CD !== '') {
           tSQL += `WHERE A.MATL_CD = '${args.data.MATL_CD}' `;
       }
       let sqlStr = `

SELECT 
    I.MATL_TYPE2,
    E.FACTORY_NAME,
    A.STOCK_DATE,
    LEFT(A.REG_DATETIME,8) AS REG_DATETIME,
    A.PO_CD,
    A.ORDER_CD, 
    H.BUYER_NAME, 
    D.VENDOR_NAME,
    A.MATL_CD,
    B.MATL_NAME,
    B.COLOR,
    B.SPEC,
    B.UNIT,
    A.STOCK_STATUS, 
    A.STOCK_QTY,
    A.REMAIN_QTY,
    A.USE_QTY,
    A.OUT_QTY,
    A.RACK,
    A.LOCATION,
    F.WARE_NAME,
    A.WARE_DATE,
    A.WARE_QTY, 
    A.PO_SEQ,
    A.MRP_SEQ,
    A.STOCK_IDX,
    A.ORG_STOCK_IDX,
    A.ROOT_IDX,
    A.REMARK,
    A.EXP_DATE,
    A.FACTORY_CD,
    A.MATL_SEQ,
    J.CD_NAME AS REASON_REMARK_NAME,
    A.PLAN_REMARK,
    C.MATL_PRICE,
    C.CURR_CD,
    A.DEBIT_CD,
    A.REMARK0,
    K.REASON_REMARK,  
    CASE WHEN DATEADD(D,-608,GETDATE())<DATEADD(D,0,A.STOCK_DATE) THEN 'S' ELSE 'L' END AS SL
FROM 
    KSV_STOCK_MATL A
       LEFT JOIN KCD_BUYER H ON LEFT(A.ORDER_CD,2) = H.BUYER_CD 
       LEFT JOIN KCD_FACTORY E ON E.FACTORY_CD = A.FACTORY_CD 
       LEFT JOIN KCD_FACTORY_WARE F ON F.FACTORY_CD = A.FACTORY_CD AND  F.WARE_CD  = A.WARE_CD 
       LEFT JOIN KCD_CODE J ON  J.CD_GROUP='REASON_REMARK' AND J.CD_CODE = A.REASON_REMARK
       LEFT JOIN KSV_STOCK_ORG_REASON K ON A.STOCK_IDX = K.STOCK_IDX, 
    KCD_MATL_MST B 
        LEFT JOIN KCD_VENDOR D ON D.VENDOR_CD = B.VENDOR_CD
        LEFT JOIN KCD_MATL_TYPE2 I ON I.SEQ = ISNULL(B.MATL_TYPE2,''),
    KCD_MATL_MEM C
${tSQL}
AND B.MATL_CD = A.MATL_CD 
AND C.MATL_CD = B.MATL_CD 
AND C.MATL_SEQ = A.MATL_SEQ 
AND A.REMAIN_QTY >= 1 
ORDER BY 1,30,3,4,6


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       MATL_TYPE2:'', 
       FACTORY_NAME:'', 
       STOCK_DATE:'', 
       REG_DATETIME:'', 
       PO_CD:'', 
       ORDER_CD:'', 
       BUYER_NAME:'', 
       VENDOR_NAME:'', 
       MATL_CD:'', 
       MATL_NAME:'', 
       COLOR:'', 
       SPEC:'', 
       UNIT:'', 
       STOCK_STATUS:'', 
       RACK:'', 
       LOCATION:'', 
       WARE_NAME:'', 
       WARE_DATE:'', 
       STOCK_IDX:'', 
       ORG_STOCK_IDX:'', 
       ROOT_IDX:'', 
       REMARK:'', 
       EXP_DATE:'', 
       FACTORY_CD:'', 
       REASON_REMARK_NAME:'', 
       PLAN_REMARK:'', 
       CURR_CD:'', 
       DEBIT_CD:'', 
       REMARK0:'', 
       REASON_REMARK:'', 
       SL:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_03_1_Stocklist_Detail; 
