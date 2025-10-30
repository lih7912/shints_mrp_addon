
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_04_6_sample_capabooking_detail = {
  Query: {
    mgrQueryS0BVT_04_6_sample_capabooking_detail : async (_, args) => {
       var tSQL = '';
       if (args.data.BOOK_DATE !== '') {
           tSQL += `WHERE BOOK_DATE = '${args.data.BOOK_DATE}' `;
       }
       let sqlStr = `

SELECT 
  BOOK_DATE, 
  USER_ID, 
  SEQ, 
  JOB_CD, 
  IN_DATE, 
  BUYER_CD, 
  PO_CD, 
  ORDER_CD, 
  STYLE_CD, 
  QTY, 
  STS_QTY, 
  COLOR, 
  USE_SIZE, 
  USAGE, 
  MW, 
  EMBRO, 
  TP, 
  SP, 
  LTHR, 
  G, 
  W, 
  S, 
  FND, 
  DL, 
  M_ETA, 
  SD, 
  KIND, 
  BVT_KIND, 
  S_ETA, 
  P_ETA, 
STOCK_FLAG, EXP_CMPT, REMARK, TPR, EMBOSSING, WASHING, CUT, FTP, DTP, LAZE
FROM   KSV_CAPASAMPLE_MEM
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
       COLOR:'', 
       USE_SIZE:'', 
       USAGE:'', 
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
       SD:'', 
       KIND:'', 
       BVT_KIND:'', 
       S_ETA:'', 
       P_ETA:'', 
       STOCK_FLAG:'', 
       REMARK:'', 
       EMBOSSING:'', 
       WASHING:'', 
       CUT:'', 
       FTP:'', 
       DTP:'', 
       LAZE:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_04_6_sample_capabooking_detail; 
