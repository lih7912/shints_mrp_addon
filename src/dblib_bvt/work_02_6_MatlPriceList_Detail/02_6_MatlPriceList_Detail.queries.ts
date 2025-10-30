
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_02_6_MatlPriceList_Detail = {
  Query: {
    mgrQueryS0BVT_02_6_MatlPriceList_Detail : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `

SELECT  PO_CD, ORDER_CD, MATL_CD,IN_QTY,PAY_DATE,PAY_CURR_CD, PAY_PRICE
FROM   KSV_STOCK_IN
WHERE  PO_CD = '${args.data.PO_CD}' 
AND ORDER_CD = '${args.data.ORDER_CD}' 
AND MATL_CD = '${args.data.MATL_CD}' 
AND PAY_DATE = '${args.data.PAY_DATE}'
           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       PO_CD:'', 
       ORDER_CD:'', 
       MATL_CD:'', 
       IN_QTY:0, 
       PAY_DATE:'', 
       PAY_CURR_CD:'', 
       PAY_PRICE:0, 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_02_6_MatlPriceList_Detail; 
