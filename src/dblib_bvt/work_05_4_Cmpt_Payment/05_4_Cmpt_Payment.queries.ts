
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_05_4_Cmpt_Payment = {
  Query: {
    mgrQueryS0BVT_05_4_Cmpt_Payment : async (_, args) => {
       var tSQL = '';
       if (args.data.ORDER_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }

       console.log('KKKKKKKKKKKK');
       let sqlStr = `

select 
       left(a.order_cd,2) as BUYER_CD,
       a.INVOICE_NO,
       h.PO_CD,
       a.ORDER_CD,
       e.STYLE_NAME,
       c.cd_name as SHIP_PTYPE_NAME,
       a.SHIP_DATE,
       a.EXFACTORY,
       sum(a.ship_cnt) as SHIP_CNT,
       case when a.ship_ptype < '4' then b.fc_price else 0 end as ORDER_PRICE,
       g.bvt_cmpt as BILL_PRICE,
       case when a.fc_chk_flag = '0' then sum(a.ship_cnt) * (case when a.ship_ptype < '4' then b.fc_price else 0 end) else sum(a.ship_cnt) * g.bvt_cmpt end as CMPT_AMT, 
       case when d.cd_name = '-' then 
          case when b.fc_nego_type = '3' then 'BVT.PRESENT' else d.cd_name end 
          else d.cd_name end as BILL_CHECK_NAME,
       f.cd_name as BILL_FLAG_NAME,
      a.FC_BILL_DATE,
      a.FC_CHK_FLAG,
      a.FC_BILL_FLAG,
      a.SHIP_PTYPE,
      b.FC_NEGO_TYPE, 
      g.BVT_SCREEN_PRINT,
      g.BVT_HEAT_SILICON,
      g.BVT_EMBROIDERY,
      g.BVT_TPR,
      g.BVT_WELDING,
      isnull(g.bvt_quilting,'0') as BVT_QUILTING,
      isnull(g.bvt_digital_print,'0') as BVT_DIGITAL_PRINT,
      isnull(g.bvt_label_print,'0') as BVT_LABEL_PRINT,
      g.BVT_LINE_CHARGE, 
      case when b.sample_flag='1' then b.fc_price-g.bvt_welding 
         else g.bvt_cmpt+g.bvt_screen_print+g.bvt_heat_silicon+g.bvt_embroidery+g.bvt_tpr+g.bvt_welding+isnull(g.bvt_quilting,'0')+isnull(g.bvt_digital_print,'0')+isnull(g.bvt_label_print,'0')+isnull(g.bvt_line_charge,'0') end as TOT_COST,
(case when b.sample_flag='1' then round(b.fc_price-g.bvt_welding,2)
         else round(g.bvt_cmpt+g.bvt_screen_print+g.bvt_heat_silicon+g.bvt_embroidery+g.bvt_tpr+g.bvt_welding+isnull(g.bvt_quilting,'0')+isnull(g.bvt_digital_print,'0')+isnull(g.bvt_label_print,'0')+isnull(g.bvt_line_charge,'0'),2) end) * (sum(a.ship_cnt)) as TOT_AMT,

      b.REMARK,b.TOT_CNT
from ksv_order_ship a
        left join kcd_code c on c.cd_group='SHIP_PTYPE' and c.cd_code = a.ship_ptype
        left join kcd_code d on d.cd_group='BILL_CHK' and d.cd_code = a.fc_chk_flag 
        left join kcd_code f on f.cd_group='BILL_FLAG' and f.cd_code = a.fc_bill_flag 
        left join ksv_order_cmpt g on g.nego_seq = (select max(nego_seq) from ksv_order_cmpt where order_cd=a.order_cd) and g.order_cd=a.order_cd,
     ksv_order_mst b
        left join ksv_po_mem h on h.order_cd = b.order_cd and h.po_seq='1',
     kcd_style e 
where a.order_cd = '${args.data.ORDER_CD}'
and b.order_cd = a.order_cd 
and e.style_cd = b.style_cd 
group by left(a.order_cd,2),a.invoice_no,h.po_cd,a.order_cd,e.style_name,c.cd_name,a.ship_date,a.exfactory,a.fc_bill_price, 
b.fc_price,d.cd_name,f.cd_name,a.fc_bill_date,a.fc_chk_flag,a.fc_bill_flag,a.ship_ptype,b.fc_nego_type, 
g.bvt_screen_print,g.bvt_heat_silicon,g.bvt_embroidery,g.bvt_tpr,g.bvt_welding,b.sample_flag,g.bvt_cmpt,g.bvt_line_charge,b.remark,b.tot_cnt,g.bvt_digital_print,g.bvt_label_print,g.bvt_quilting 


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {};
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_05_4_Cmpt_Payment; 
