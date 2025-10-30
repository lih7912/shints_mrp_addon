
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_06_1_EndingMatlAmt_Detail = {
  Query: {
    mgrQueryS0BVT_06_1_EndingMatlAmt_Detail : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `

select 
    a.PO_CD,
    left(a.order_cd,2) as BUYER_CD,
    b.MATL_CD,
    e.MATL_NAME,
    e.COLOR,
    e.SPEC,
    b.TOT_QTY,
    b.IN_QTY,
    b.IN_CURR_CD,
    b.IN_PRICE,
    b.PAY_CURR_CD,
    b.PAY_PRICE,
    h.MATL_PRICE,
    b.TT_FLAG,
    g.WARE_NAME, 
    b.in_qty*b.pay_price as TOT_PRICE,
    b.END_FLAG,
    b.END_DATE,
    b.PAY_DATE,
    b.BILL_FLAG,
    b.BILL_DATE,
    d.VENDOR_NAME,
    a.PO_SEQ,
    a.ORDER_CD,
    a.MRP_SEQ,
    b.IN_DATETIME,
    b.MATL_SEQ,
    b.CALC_FLAG,
    d.VENDOR_CD,
    b.PUR_FACTORY,
    b.PAY_REPORT
from ksv_stock_mem a,ksv_stock_in b,kcd_vendor d,kcd_matl_mst e,kcd_matl_mem f,kcd_factory_ware g,kcd_matl_sale h 
where left(b.in_datetime,8) = '${args.data.IN_DATETIME}' 
and e.vendor_cd = '${args.data.VENDOR_CD}' 
and b.po_cd = a.po_cd  
and b.pur_factory = g.ware_cd 
and b.po_seq = a.po_seq 
and b.order_cd = a.order_cd 
and b.matl_cd = a.matl_cd 
and b.mrp_seq = a.mrp_seq 
and d.vendor_cd = e.vendor_cd 
and e.matl_cd = b.matl_cd 
and f.matl_cd = a.matl_cd 
and f.matl_seq = a.matl_seq 
and h.matl_cd = a.matl_cd 
and h.matl_seq = (select max(matl_seq) from kcd_matl_sale where a.matl_cd=matl_cd) 
and left(b.pay_report,4) <>  'temp' 


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       PO_CD:'', 
       BUYER_CD:'', 
       MATL_CD:'', 
       MATL_NAME:'', 
       COLOR:'', 
       SPEC:'', 
       TOT_QTY:0, 
       IN_QTY:0, 
       IN_CURR_CD:'', 
       IN_PRICE:0, 
       PAY_CURR_CD:'', 
       PAY_PRICE:0, 
       MATL_PRICE:0, 
       TT_FLAG:'', 
       WARE_NAME:'', 
       TOT_PRICE:0, 
       END_FLAG:'', 
       END_DATE:'', 
       PAY_DATE:'', 
       BILL_FLAG:'', 
       BILL_DATE:'', 
       VENDOR_NAME:'', 
       PO_SEQ:0, 
       ORDER_CD:'', 
       MRP_SEQ:0, 
       IN_DATETIME:'', 
       MATL_SEQ:0, 
       CALC_FLAG:'', 
       VENDOR_CD:'', 
       PUR_FACTORY:'', 
       PAY_REPORT:'', 
       END_FLAG:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_06_1_EndingMatlAmt_Detail; 
