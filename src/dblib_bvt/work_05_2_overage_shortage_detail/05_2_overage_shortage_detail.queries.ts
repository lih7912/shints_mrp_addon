
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_05_2_overage_shortage_detail = {
  Query: {
    mgrQueryS0BVT_05_2_overage_shortage_detail : async (_, args) => {
       var tSQL = '';
       if (args.data.ORDER_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `

SELECT 
  f.PO_CD, 
  a.ORDER_CD, 
  b.STYLE_NAME, 
  a.TOT_CNT, 
  SUM(c.SHIP_CNT) as SHIP_CNT, 
  case when (SUM(c.SHIP_CNT)-a.TOT_CNT) > 0 then SUM(c.SHIP_CNT)-a.TOT_CNT else '0' end as OVER_QTY, 
  case when (a.TOT_CNT - SUM(c.SHIP_CNT)) > 0 then a.TOT_CNT - SUM(c.SHIP_CNT) else '0' end as SHORT_QTY,
  case when (sum(c.SHIP_CNT)-a.TOT_CNT) < 0 then 'Shortage' when (sum(c.SHIP_CNT)-a.TOT_CNT) > 0 then 'Overage' else '' end as TYPE,
  d.VMD_QTY, 
  d.VMD_SUB_QTY,  
  d.SMD_QTY, 
  MAX(c.SHIP_DATE) as LATEST_SHIP_DATE, 
  d.CONFIRM_USER, 
  d.CONFIRM_AMT, 
  a.USD_PRICE, 
  a.FC_PRICE, 
  e.CD_NAME as ORDER_STATUS_NAME, 
  d.STS_COMMENT, 
  d.BVT_COMMENT, 
  d.SUP_QTY, 
  d.BUYER_QTY, 
  d.STS_QTY, 
  a.REMARK, 
  d.END_FLAG, 
  d.END_DATE,
  g.FACTORY_NAME
FROM 
  KSV_ORDER_MST a 
    left join KSV_ORDER_SHIP c on c.ORDER_CD = a.ORDER_CD   
    left join KSV_ORDER_OVER_SHORT d on d.ORDER_CD = a.ORDER_CD   
    left join KCD_CODE e on e.CD_GROUP = 'ORDER_STATUS' AND e.CD_CODE = a.ORDER_STATUS   
    left join KSV_PO_MEM f on f.PO_SEQ = '1' AND f.ORDER_CD = a.ORDER_CD
		left outer join KCD_FACTORY g on(a.factory_cd = g.factory_cd) ,
  KCD_STYLE b 
WHERE a.order_cd ='${args.data.ORDER_CD}' 
and a.STYLE_CD = b.STYLE_CD
AND c.ORDER_CD = a.ORDER_CD
AND a.ORDER_STATUS IN ('8','9')
AND a.SAMPLE_FLAG = '0'
GROUP BY f.PO_CD, a.ORDER_CD, b.STYLE_NAME, a.TOT_CNT, d.VMD_QTY, d.VMD_SUB_QTY, d.SMD_QTY, d.CONFIRM_USER, d.CONFIRM_AMT, a.USD_PRICE, a.FC_PRICE, e.CD_NAME, d.STS_COMMENT, d.BVT_COMMENT, d.SUP_QTY, d.BUYER_QTY, d.STS_QTY, a.REMARK, d.END_FLAG, d.END_DATE, g.FACTORY_NAME


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       PO_CD:'', 
       ORDER_CD:'', 
       STYLE_NAME:'', 
       TOT_CNT:0, 
       SHIP_CNT:0, 
       OVER_QTY:0, 
       SHORT_QTY:0, 
       VMD_QTY:'', 
       VMD_SUB_QTY:'', 
       SMD_QTY:'', 
       LATEST_SHIP_DATE:'', 
       CONFIRM_USER:'', 
       CONFIRM_AMT:'', 
       USD_PRICE:0, 
       FC_PRICE:0, 
       ORDER_STATUS_NAME:'', 
       STS_COMMENT:'', 
       BVT_COMMENT:'', 
       SUP_QTY:'', 
       BUYER_QTY:'', 
       STS_QTY:'', 
       REMARK:'', 
       END_FLAG:'', 
       END_DATE:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 
       return (tRet);
    },
  },
};

export default moduleQueryS0BVT_05_2_overage_shortage_detail; 
