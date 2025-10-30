
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_02_5_MatlList_Detail = {
  Query: {
    mgrQueryS0BVT_02_5_MatlList_Detail : async (_, args) => {
       var tSQL = '';
       if (args.data.MATL_CD !== '') {
           tSQL += `AND a.MATL_CD = '${args.data.MATL_CD}' `;
       }
       let sqlStr = `

select 
      i.MATL_TYPE2,
      a.MATL_CD,
      c.cd_name as MATL_TYPE_NAME ,
      e.VENDOR_NAME,
      a.MATL_NAME,
      a.COLOR,
      a.SPEC,
      d.cd_name as MATL_UNIT_NAME,
      isnull(b.matl_price,0) as MATL_PRICE,
      b.CURR_CD,
      isnull(f.matl_price,0) as MATL_SPRICE,
      f.curr_cd as SCURR_CD,
      isnull(a.weight,0) as WEIGHT,
      h.cd_name as BOX_UNIT_NAME,
      g.cd_name as STATUS_NAME,
      a.HS_CD,
      isnull(a.add_rate,0) as ADD_RATE,
      isnull(a.add_amt,0) as ADD_AMT,
      isnull(a.add_loss,0)as ADD_LOSS,
      a.BVT_MATL_NAME
from kcd_matl_mst a
     left join kcd_code c on c.cd_group = 'MATL_TYPE' and c.cd_code = a.matl_type
     left join kcd_code d on d.cd_group = 'MATL_UNIT' and d.cd_code = a.unit
     left join kcd_code g on g.cd_group = 'STATUS_CD' and g.cd_code = a.status_cd
     left join kcd_code h on h.cd_group = 'BOX_UNIT' and h.cd_code = a.box_unit 
     left join kcd_vendor e on e.vendor_cd = a.vendor_cd 
     left join kcd_matl_type2 i on i.seq = a.matl_type2 
     left join kcd_matl_sale f on f.matl_cd = a.matl_cd 
           and f.matl_seq = (select max(matl_seq) from kcd_matl_sale where matl_cd = a.matl_cd)
     ,
     kcd_matl_mem b
where len(a.matl_type) = 1 
${tSQL}
and b.matl_cd = a.matl_cd 
and b.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = a.matl_cd) 
order by a.matl_cd 


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       MATL_TYPE2:'', 
       MATL_CD:'', 
       MATL_TYPE_NAME:'', 
       VENDOR_NAME:'', 
       MATL_NAME:'', 
       COLOR:'', 
       SPEC:'', 
       MATL_UNIT_NAME:'', 
       MATL_PRICE:0, 
       CURR_CD:'', 
       MATL_SPRICE:0, 
       SCURR_CD:'', 
       WEIGHT:0, 
       BOX_UNIT_NAME:'', 
       STATUS_NAME:'', 
       HS_CD:'', 
       ADD_RATE:0, 
       ADD_AMT:0, 
       ADD_LOSS:0, 
       BVT_MATL_NAME:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_02_5_MatlList_Detail; 
