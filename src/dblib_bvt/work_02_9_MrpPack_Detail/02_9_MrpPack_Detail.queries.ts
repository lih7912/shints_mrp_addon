
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_02_9_MrpPack_Detail = {
  Query: {
    mgrQueryS0BVT_02_9_MrpPack_Detail : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `

SELECT 
       A.ORDER_CD,
       A.PO_CD, 
       A.PO_SEQ ,
       A.MATL_CD,
       C.MATL_NAME,
       C.COLOR,
       C.SPEC,
       C.UNIT,
       A.PO_MATL_CD,
       E.RACK,
       B.CD_NAME AS USE_PO_TYPE_NAME,
	     F.CD_NAME AS DIFF_PO_TYPE_NAME,
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
     LEFT JOIN KSV_STOCK_MATL E ON(E.STOCK_IDX = A.STOCK_IDX)
     LEFT JOIN KCD_MATL_MST C on(A.MATL_CD = C.matl_cd)
	 LEFT JOIN KCD_CODE B on(B.CD_GROUP = 'USE_PO_TYPE' AND B.CD_CODE = A.USE_PO_TYPE)
     LEFT JOIN KCD_VENDOR D on(D.VENDOR_CD  = C.VENDOR_CD)
	 left join KCD_CODE F on (f.cd_group = 'diff_po_type' and f.cd_code = a.diff_po_type)

WHERE A.ORDER_CD = '${args.data.ORDER_CD}'
AND A.DIFF_PO_TYPE NOT IN('1','2','4') 
           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       ORDER_CD:'', 
       PO_CD:'', 
       PO_SEQ:0, 
       MATL_CD:'', 
       MATL_NAME:'', 
       COLOR:'', 
       SPEC:'', 
       UNIT:'', 
       PO_MATL_CD:'', 
       RACK:'', 
       USE_PO_TYPE_NAME:'', 
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

export default moduleQueryS0BVT_02_9_MrpPack_Detail; 
