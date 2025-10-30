
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_04_2_Kind3List_detail = {
  Query: {
    mgrQueryS0BVT_04_2_Kind3List_detail : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `

SELECT  CD_CODE, CD_NAME, CD_FLAG
FROM     KCD_CODE
WHERE CD_GROUP = 'BVT_KIND'


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       CD_CODE:'', 
       CD_NAME:'', 
       CD_FLAG:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_04_2_Kind3List_detail; 
