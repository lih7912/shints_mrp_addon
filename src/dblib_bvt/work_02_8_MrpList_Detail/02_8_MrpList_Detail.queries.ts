
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_02_8_MrpList_Detail = {
  Query: {
    mgrQueryS0BVT_02_8_MrpList_Detail : async (_, args) => {
       let sqlStr = `
SELECT  a.ORDER_CD, a.PROD_CD, a.ORDER_MRP_SEQ, a.MATL_CD, a.NET, a.LOSS, a.GROSS, a.REMARK as USAGE, a.USE_SIZE, a.SEQ, a.COUNTRY, a.REG_USER, a.REG_DATETIME , b.COLOR, c.TOT_CNT as TOT_QTY , e.SUM_QTY as QUANTITY , f.MATL_PRICE, f.CURR_CD 
FROM     KSV_ORDER_MRP A 
left outer join KSV_PROD_MST B on (a.prod_cd = b.prod_cd)
left outer join KSV_ORDER_MST C on (a.order_cd = c.order_cd)
left outer join KCD_MATL_MEM D on (a.MATL_CD = d.MATL_CD)
left outer join KSV_PO_MRP E on (a.order_cd = e.order_cd and a.matl_cd = e.matl_cd and e.po_seq = (select max(po_seq) from ksv_po_mrp where order_cd = e.order_cd and matl_cd = e.matl_cd))
left outer join KCD_MATL_MEM F on(a.matl_cd = f.matl_cd and f.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = f.matl_cd))

WHERE  (a.ORDER_CD = '${args.data.ORDER_CD}')
AND (a.ORDER_MRP_SEQ =(SELECT  MAX(ORDER_MRP_SEQ) AS Expr1 FROM KSV_ORDER_MRP AS KSV_ORDER_MRP_1 WHERE  (ORDER_CD = '${args.data.ORDER_CD}')))
group by a.ORDER_CD, a.PROD_CD, a.ORDER_MRP_SEQ, a.MATL_CD, a.NET, a.LOSS, a.GROSS, a.REMARK, a.USE_SIZE, a.SEQ, a.COUNTRY, a.REG_USER, a.REG_DATETIME , b.COLOR, c.TOT_CNT , e.sum_qty, f.matl_price, f.curr_cd
           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       ORDER_CD:'', 
       PROD_CD:'', 
       ORDER_MRP_SEQ:0, 
       MATL_CD:'', 
       NET:0, 
       LOSS:0, 
       GROSS:0, 
       USAGE:'', 
       USE_SIZE:'', 
       SEQ:0, 
       COUNTRY:'', 
       REG_USER:'', 
       REG_DATETIME:'', 
       COLOR:'', 
       TOT_QTY:0, 
       QUANTITY:0, 
       MATL_PRICE:0, 
       CURR_CD:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_02_8_MrpList_Detail; 
