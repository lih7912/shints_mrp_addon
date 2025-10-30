// KSV_CAPABOOK_MEM/KSV_CAPABOOK_MEM.queries.js

import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryMGR2_KSV_CAPABOOK_MEM = {
  Query: {
    queryMGR2_KSV_CAPABOOK_MEM: async (_, args) => {

       var tSQL = '';

       if (args.BOOK_DATE !== '') {
          tSQL += `AND BOOK_DATE = '${args.BOOK_DATE}' `;
       }
       if (args.USER_ID !== '') {
          tSQL += `AND USER_ID = '${args.USER_ID}' `;
       }

       sqlStr = '';

       let sqlStr = `
           SELECT * 
           FROM KSV_CAPABOOK_MEM 
           WHERE BOOK_DATE <> '' 
           AND BOOK_DATE = (
              SELECT MAX(BOOK_DATE) FROM KSV_CAPABOOK_MEM 
              WHERE BOOK_DATE <> ''
              ${tSQL}
           )
           ${tSQL}
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       return (tRet);
    },
  },
};

export default moduleQueryMGR2_KSV_CAPABOOK_MEM; 
