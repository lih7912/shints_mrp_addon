
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_02_4_Size_Detail = {
  Query: {
    mgrQueryS0BVT_02_4_Size_Detail : async (_, args) => {
       var tSQL = '';
       if (args.data.SIZE_GROUP !== '') {
           tSQL += `WHERE   SIZE_GROUP like '%${args.data.SIZE_GROUP}%'  `;
       }
       let sqlStr = `

SELECT  SIZE_GROUP, SIZE_MEMBER, SIZE_CNT
FROM     KCD_SIZE_MST
${tSQL}
           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       SIZE_GROUP:'', 
       SIZE_MEMBER:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_02_4_Size_Detail; 
