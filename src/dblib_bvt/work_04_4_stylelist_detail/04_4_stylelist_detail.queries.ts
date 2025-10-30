
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_04_4_stylelist_detail = {
  Query: {
    mgrQueryS0BVT_04_4_stylelist_detail : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `WHERE A.STYLE_CD like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `

SELECT 
A.STYLE_CD,
A.STYLE_NAME,
B.BUYER_NAME,
C.CD_NAME AS KIND_NAME,
A.MW,A.EMBRO,
A.TP,A.SP,
A.LTHR,
A.G,
A.W,
A.S,
A.FND,
A.DL,
A.TPR,
A.EMBOSSING,
WASHING,
A.DOWN,
A.CUT,
A.FTP,
A.DTP,
A.LAZE,
A.BUYER_CD,
A.BVT_KIND 
FROM KCD_STYLE A
     LEFT JOIN KCD_CODE C ON C.CD_GROUP = 'BVT_KIND' AND C.CD_CODE = A.BVT_KIND,
    KCD_BUYER B
${tSQL}
AND B.BUYER_CD = A.BUYER_CD 


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       STYLE_CD:'', 
       STYLE_NAME:'', 
       BUYER_NAME:'', 
       KIND_NAME:'', 
       MW:'', 
       EMBRO:'', 
       TP:'', 
       SP:'', 
       LTHR:'', 
       G:'', 
       W:'', 
       S:'', 
       FND:'', 
       DL:'', 
       EMBOSSING:'', 
       WASHING:'', 
       DOWN:'', 
       CUT:'', 
       FTP:'', 
       DTP:'', 
       LAZE:'', 
       BUYER_CD:'', 
       BVT_KIND:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_04_4_stylelist_detail; 
