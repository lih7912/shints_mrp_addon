
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_neoe_code = {
  Query: {
    mgrQueryneoe_code : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `

select nm_mngd, cd_mngd
from neoe.fi_mngd
where cd_mng = 'a23' and cd_company = '1000'
order by cd_mngd

           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       nm_mngd:'', 
       cd_mngd:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQuery_neoe_code; 
