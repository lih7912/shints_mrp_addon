
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_04_5_capabookiong_detail = {
  Query: {
    mgrQueryS0BVT_04_5_capabookiong_detail : async (_, args) => {
       var tSQL = '';
       if (args.data.BOOK_DATE !== '') {
           tSQL += `WHERE BOOK_DATE = '${args.data.BOOK_DATE}' `;
       }
       let sqlStr = `

SELECT 
    a.BOOK_DATE, 
    a.USER_ID, 
    a.JOB_CD, 
    a.IN_DATE, 
    a.BUYER_CD, 
    a.PO_CD, 
    a.ORDER_CD, 
    a.STYLE_CD, 
    a.QTY, 
    a.NR, 
    a.MW, 
    a.EMBRO, 
    a.TP, 
    a.SP, 
    a.LTHR, 
    a.G, 
    a.W, 
    a.S, 
    a.FND, 
    a.DL, 
    a.M_ETA,
    a.FOB, 
    a.SD,
    a.KIND, 
    a.BVT_KIND, 
    a.S_ETA, 
    a.EXP_CMPT, 
    a.REMARK, 
    a.TPR, 
    a.EMBOSSING, 
    a.WASHING, 
    a.DOWN, 
    a.CUT, 
    a.FTP, 
    a.DTP, 
    a.LAZE,
    b.STYLE_NAME
FROM   KSV_CAPABOOK_MEM A left outer join KCD_STYLE B on(a.STYLE_CD = b.STYLE_CD)
${tSQL}


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       BOOK_DATE:'', 
       USER_ID:'', 
       JOB_CD:'', 
       IN_DATE:'', 
       BUYER_CD:'', 
       PO_CD:'', 
       ORDER_CD:'', 
       STYLE_CD:'', 
       QTY:'', 
       NR:'', 
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
       M_ETA:'', 
       FOB:'', 
       SD:'', 
       KIND:'', 
       BVT_KIND:'', 
       S_ETA:'', 
       REMARK:'', 
       TPR:'', 
       EMBOSSING:'', 
       WASHING:'', 
       DOWN:'', 
       CUT:'', 
       FTP:'', 
       DTP:'', 
       LAZE:'', 
       STYLE_NAME:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_04_5_capabookiong_detail; 
