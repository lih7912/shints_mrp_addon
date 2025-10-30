
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_06_3_1_InputList_Detail = {
  Query: {
    mgrQueryS0BVT_06_3_1_InputList_Detail : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `

select 
    case when out_status = '0' then 'IN' when out_status = '1' then 'OUT' else '' end as IO_STATUS, 
    a.PO_CD,
    a.ORDER_CD,
    d.VENDOR_NAME,
    c.MATL_NAME,
    c.COLOR,
    c.SPEC,
    c.UNIT,
    a.IN_QTY,
    a.TOT_QTY,
    a.LC_QTY,
    e.cd_name as BILL_TYPE_NAME, 
    left(a.in_datetime,8) as IN_DATE,
    b.cd_name as IN_TYPE_NAME,
    a.PAY_PRICE,
    a.PAY_CURR_CD,
    a.PAY_DATE,
    a.PAY_REPORT,
    a.LC_BILL_NO,
    c.MATL_CD,
    a.MIN_FLAG,
    a.STOCK_QTY,
    a.OUT_STATUS,
    a.OUT_QTY, 
    a.PO_SEQ,
    a.MRP_SEQ,
    a.IN_DATETIME,
    a.BILL_FLAG,
    a.IN_TYPE,
    d.VENDOR_TYPE,
    a.STOCK_IDX,
    a.CALC_FLAG 
from 
    ksv_stock_in a
      left join kcd_code e on e.cd_group = 'BILL_TYPE' and e.cd_code = a.bill_type
      left join kcd_code b on b.cd_group = 'IN_TYPE' and b.cd_code = a.in_type,
    kcd_matl_mst c
      left join kcd_code f on f.cd_group=  'MATL_TYPE' and f.cd_code=  c.matl_type,
    kcd_vendor d,
    kcd_matl_type2 g 
where left(a.in_datetime,8) = '${args.data.IN_DATETIME}' 
and c.vendor_cd = '${args.data.VENDOR_CD}' 
and c.matl_cd = a.matl_cd 
and d.vendor_cd  = c.vendor_cd 
and g.seq=c.matl_type2


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       IO_STATUS:'', 
       PO_CD:'', 
       ORDER_CD:'', 
       VENDOR_NAME:'', 
       MATL_NAME:'', 
       COLOR:'', 
       SPEC:'', 
       UNIT:'', 
       IN_QTY:0, 
       TOT_QTY:0, 
       LC_QTY:0, 
       BILL_TYPE_NAME:'', 
       IN_DATE:'', 
       IN_TYPE_NAME:'', 
       PAY_PRICE:0, 
       PAY_CURR_CD:'', 
       PAY_DATE:'', 
       PAY_REPORT:'', 
       LC_BILL_NO:'', 
       MATL_CD:'', 
       MIN_FLAG:'', 
       STOCK_QTY:0, 
       OUT_STATUS:'', 
       OUT_QTY:0, 
       PO_SEQ:0, 
       MRP_SEQ:0, 
       IN_DATETIME:'', 
       BILL_FLAG:'', 
       IN_TYPE:'', 
       IN_QTY:0, 
       TOT_QTY:0, 
       VENDOR_TYPE:'', 
       STOCK_IDX:'', 
       CALC_FLAG:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_06_3_1_InputList_Detail; 
