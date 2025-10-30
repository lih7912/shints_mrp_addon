
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_02_7_SupplierList_Detail = {
  Query: {
    mgrQueryS0BVT_02_7_SupplierList_Detail : async (_, args) => {
       var tSQL = '';
       if (args.data.VENDOR_CD !== '') {
           tSQL += `where a.vendor_cd = '${args.data.VENDOR_CD}' `;
       }
       let sqlStr = `

select 
   a.VENDOR_CD,
   a.VENDOR_NAME,
   a.INVOICE_NAME,
   c.cd_name as VENDOR_TYPE_NAME,
   f.cd_name as VENDOR_MATL_TYPE_NAME,
   h.cd_name as GW_STATUS_NAME,
   a.REG_NO,
   a.PRESIDENT,
   a.USER_NAME,
   a.PART,
   a.RANK,
   a.EMAIL,
   a.TEL_NO,
   a.FAX_NO,
   a.PAY_TYPE,
   a.PAY_TERM,
   d.NAT_NAME,
   a.ZIP_NO,
   a.ADDR1,
   a.ADDR2,
   b.cd_name as STATUS_NAME,
   a.REG_USER,
   a.PERMIT,
   g.USER_NAME as GW_USER_NAME,
   a.APPROKEY,
   a.NEOE_NO,
   a.LEAD_TIME,
   a.REMARK 
from kcd_vendor a
   left join kcd_code b on b.cd_group = 'STATUS_CD' and b.cd_code = a.status_cd
   left join kcd_code c on c.cd_group = 'VENDOR_TYPE' and c.cd_code = a.vendor_type 
   left join kcd_code f on f.cd_group = 'VENDOR_MATL_TYPE' and isnull(a.vendor_matl_type,'') =f.cd_code
   left join kcd_nation  d on d.nat_cd = a.nat_cd 
   left join kcd_user  g on g.user_id = a.shints_user 
   left join kcd_code h on h.cd_group ='GW_STATUS' and h.cd_code = a.gw
${tSQL}


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       VENDOR_CD:'', 
       VENDOR_NAME:'', 
       INVOICE_NAME:'', 
       VENDOR_TYPE_NAME:'', 
       VENDOR_MATL_TYPE_NAME:'', 
       GW_STATUS_NAME:'', 
       REG_NO:'', 
       PRESIDENT:'', 
       USER_NAME:'', 
       PART:'', 
       RANK:'', 
       EMAIL:'', 
       TEL_NO:'', 
       FAX_NO:'', 
       PAY_TYPE:'', 
       NAT_NAME:'', 
       ZIP_NO:'', 
       ADDR1:'', 
       ADDR2:'', 
       STATUS_NAME:'', 
       REG_USER:'', 
       PERMIT:'', 
       GW_USER_NAME:'', 
       APPROKEY:'', 
       NEOE_NO:'', 
       LEAD_TIME:'', 
       REMARK:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_02_7_SupplierList_Detail; 
