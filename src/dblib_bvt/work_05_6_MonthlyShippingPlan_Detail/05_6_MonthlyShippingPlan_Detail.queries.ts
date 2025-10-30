
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_05_6_MonthlyShippingPlan_Detail = {
  Query: {
    mgrQueryS0BVT_05_6_MonthlyShippingPlan_Detail : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `

select 
    left(a.order_cd,2) as BUYER_CD,
    b.PO_CD,
    a.ORDER_CD,
    c.STYLE_NAME,
    a.TOT_CNT,
    isnull(sum(d.ship_cnt),0) as SHIP_CNT,
    (select isnull(sum(plan_qty),0) from ksv_order_ship_plan where order_cd ='${args.data.ORDER_CD}') as SHIP_PLAN_CNT,
    a.USD_PRICE, 
    a.CURR_CD ,
    a.FC_PRICE,
    isnull(sum(d.ship_cnt),0)*a.usd_price as PLAN_AMT,
    (a.tot_cnt-isnull(sum(d.ship_cnt),0))*a.usd_price as SHIP_AMT,
    -1*isnull(SUM(d.ship_cnt),0)*a.usd_price as ORDER_BALANCE,
    a.DUE_DATE,
	  isnull(g.POSS_DATE,'') as POSS_DATE,
    isnull(g.PLAN_QTY,'') as PLAN_QTY,
    e.remark as PAY_RULE_TERM_NAME,
    a.FACTORY_CD 
from ksv_order_mst a 
     left outer join ksv_po_mem b on(b.order_cd = a.order_cd and b.po_seq ='1') 
     left outer join ksv_order_ship d on(d.order_cd = a.order_cd and d.ship_ptype in('0','5') )
     left outer join kcd_style c on(c.style_cd=a.style_cd )
     left outer join kcd_buyer f on(left(a.order_cd,2) = f.buyer_cd )
     left outer join kcd_pay_rule e on(e.cd_code = f.pay_rule)
		 left outer join ksv_order_ship_plan g on(a.order_cd = g.order_cd)
where a.order_cd = '${args.data.ORDER_CD}' 
and a.order_type in ('0','1') 
and a.order_status not in('*','4','9') 
group by a.order_cd,a.tot_cnt,a.usd_price,a.curr_cd,a.fc_price,a.due_date, b.PO_CD ,c.STYLE_NAME ,e.remark, a.FACTORY_CD,g.poss_date,g.plan_qty


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       BUYER_CD:'', 
       PO_CD:'', 
       ORDER_CD:'', 
       STYLE_NAME:'', 
       TOT_CNT:0, 
       SHIP_CNT:0, 
       SHIP_PLAN_CNT:0, 
       USD_PRICE:0, 
       CURR_CD:'', 
       FC_PRICE:0, 
       PLAN_AMT:0, 
       SHIP_AMT:0, 
       ORDER_BALANCE:0, 
       DUE_DATE:'', 
       PAY_RULE_TERM_NAME:'', 
       FACTORY_CD:'', 
       POSS_DATE:'', 
       PLAN_QTY:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_05_6_MonthlyShippingPlan_Detail; 
