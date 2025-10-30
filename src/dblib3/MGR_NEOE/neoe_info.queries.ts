
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQuery_neoe_info = {
  Query: {
    mgrQuery_neoe_info : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }

       var tWObj = {};

       let sqlStr1 = `
           select cd_field, cd_sysdef, nm_sysdef 
           from   neoe.ma_codedtl
           where  cd_company  = '1000'
         `;
       var tRet1  =  await prisma.$queryRaw(Prisma.raw(sqlStr1));
       tWObj.MA_CODEDTL = [ ...tRet1 ];

       let sqlStr2 = `
             select curr_sour, rate_base
             from neoe.ma_exchange
             where yymmdd = '${args.data.CURR_DATE}'
         `;
       var tRet2  =  await prisma.$queryRaw(Prisma.raw(sqlStr2));
       tWObj.MA_EXCHANGE = [ ...tRet2 ];

       let sqlStr3 = `
              select cd_mngd, nm_mngd
              from neoe.fi_mngd
              where cd_mng='a23' and cd_company='1000'
         `;
       var tRet3  =  await prisma.$queryRaw(Prisma.raw(sqlStr3));
       tWObj.FI_MNGD = [ ...tRet3 ];

       var tRetArray = [];
       var tIdx = 0; 
       return (tWObj);
    },
  },
};

export default moduleQuery_neoe_info; 
