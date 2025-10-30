
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_neoe_currency = {
  Query: {
    mgrQueryneoe_currency : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `

      select CURR_SOUR,isnull(RATE_BASE,'0.00')  as RATE_BASE
        from neoe.MA_EXCHANGE 
        where cd_company ='1000' 
        -- and YYMMDD = '20230821' 
        and YYMMDD = '${args.data.KEY1}' 
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       CURR_SOUR:'', 
       RATE_BASE:0, 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQuery_neoe_currency; 
