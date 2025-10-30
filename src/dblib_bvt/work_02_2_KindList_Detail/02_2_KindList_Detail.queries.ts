
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_02_2_KindList_Detail = {
  Query: {
    mgrQueryS0BVT_02_2_KindList_Detail : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `

SELECT  SEQ, MATL_TYPE2, BVT_MATL_NAME
FROM     KCD_MATL_TYPE2

           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       SEQ:'', 
       MATL_TYPE2:'', 
       BVT_MATL_NAME:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_02_2_KindList_Detail; 
