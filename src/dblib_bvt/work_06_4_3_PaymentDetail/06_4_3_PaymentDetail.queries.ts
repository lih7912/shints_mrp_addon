
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_06_4_3_PaymentDetail = {
  Query: {
    mgrQueryS0BVT_06_4_3_PaymentDetail : async (_, args) => {
       var tSQL = '';
       if (args.data.PO_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `


			SELECT 
           A.ORDER_CD,
           A.MATL_CD,
           C.MATL_NAME,
           C.COLOR,
           C.SPEC,
           C.UNIT,
           A.PO_MATL_CD,
           E.RACK,
           B.CD_NAME,
           A.USE_QTY,
           A.PO_QTY,
           A.SUM_QTY,
			     D.VENDOR_NAME,
           A.STOCK_CHK,
           A.MRP_SEQ,
           A.MATL_SEQ,
           A.MATL_PRICE,
           A.CURR_CD,
           A.PO_MRP_SEQ,
           A.REG_DATETIME,
           A.STOCK_IDX,
           E.ROOT_IDX 
			FROM KSV_PO_MRP A 
           LEFT JOIN KCD_CODE B ON B.CD_GROUP = 'USE_PO_TYPE' AND B.CD_CODE = A.USE_PO_TYPE
           LEFT JOIN KSV_STOCK_MATL E ON E.STOCK_IDX = A.STOCK_IDX, 
           KCD_MATL_MST C,KCD_VENDOR D
			WHERE A.PO_CD = '${args.data.PO_CD}' 
			AND A.PO_SEQ = '${args.data.PO_SEQ}' 
			AND A.DIFF_PO_TYPE NOT IN('1','2','4') 
			AND C.MATL_CD = A.MATL_CD 
			AND D.VENDOR_CD  = C.VENDOR_CD 
			ORDER BY  A.ORDER_CD, A.MATL_CD 

           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       ORDER_CD:'', 
       MATL_CD:'', 
       MATL_NAME:'', 
       COLOR:'', 
       SPEC:'', 
       UNIT:'', 
       PO_MATL_CD:'', 
       RACK:'', 
       CD_NAME:'', 
       USE_QTY:0, 
       PO_QTY:0, 
       SUM_QTY:0, 
       VENDOR_NAME:'', 
       STOCK_CHK:'', 
       MRP_SEQ:0, 
       MATL_SEQ:0, 
       MATL_PRICE:0, 
       CURR_CD:'', 
       PO_MRP_SEQ:0, 
       REG_DATETIME:'', 
       STOCK_IDX:'', 
       ROOT_IDX:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_06_4_3_PaymentDetail; 
