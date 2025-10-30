
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_05_5_NegoCmpt_Detail = {
  Query: {
    mgrQueryS0BVT_05_5_NegoCmpt_Detail : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `



				SELECT 
           E.PO_CD,
           A.ORDER_CD,
           C.STYLE_NAME,
           A.DUE_DATE,
           A.TOT_CNT,
				   'FAC' AS FAC_TYPE,
           NULL AS BVT_CMPT,
           NULL AS BVT_SCREEN_PRINT,
           NULL AS BVT_HEAT_PRINT,
           NULL AS BVT_EMBROIDERY,
           NULL AS BVT_TPR,
           NULL AS BVT_WELDING,
           NULL AS BVT_QUILTING,
           NULL AS BVT_DIGITAL_PRINT,
           NULL AS BVT_LABEL_PRINT,
           NULL AS BVT_LINE_CHARGE,
           NULL AS TOT_CMPT,
           D.CD_NAME AS NEGO_TYPE_NAME,
           '' AS REMARK,
           A.FC_NEGO_TYPE AS NEGO_TYPE,
           NULL AS STS_CMPT,
           A.ORDER_STATUS,
           '0' AS NEGO_SEQ,
					 LEFT(A.ORDER_CD,2) as BUYER_CD,
					 A.FACTORY_CD 
				FROM KSV_ORDER_MST A
               LEFT JOIN KCD_CODE D  ON D.CD_GROUP = 'FC_NEGO_TYPE' AND D.CD_CODE = A.FC_NEGO_TYPE
               LEFT JOIN KSV_PO_MEM E ON  E.ORDER_CD = A.ORDER_CD AND E.PO_SEQ = 1,
             KSV_ORDER_CMPT B,
             KCD_STYLE C
				WHERE A.STYLE_CD <> '00-0000' 
				AND A.FC_NEGO_TYPE <> '0' 
				AND A.ORDER_STATUS <> '4' 
				AND A.ORDER_TYPE IN ('0','1') 
				AND B.ORDER_CD = A.ORDER_CD 
				AND B.NEGO_SEQ = (SELECT MAX(NEGO_SEQ) FROM KSV_ORDER_CMPT WHERE ORDER_CD = A.ORDER_CD) 
				AND C.STYLE_CD = A.STYLE_CD 
				AND D.CD_GROUP = 'FC_NEGO_TYPE' AND D.CD_CODE = B.NEGO_TYPE 
				AND A.ORDER_CD LIKE '%${args.data.ORDER_CD}%' 

				UNION 

				SELECT 
           E.PO_CD,
           A.ORDER_CD,
           C.STYLE_NAME,
           A.DUE_DATE,
           A.TOT_CNT,
				   'FAC' AS FAC_TYPE,
           B.BVT_CMPT,
           B.BVT_SCREEN_PRINT,
           B.BVT_HEAT_SILICON,
           B.BVT_EMBROIDERY,
           B.BVT_TPR,
           B.BVT_WELDING,
				   ISNULL(B.BVT_QUILTING,'0'),
           ISNULL(B.BVT_DIGITAL_PRINT,'0'),
           ISNULL(B.BVT_LABEL_PRINT,'0'),
           ISNULL(B.BVT_LINE_CHARGE,'0'),
				   (B.BVT_CMPT+B.BVT_SCREEN_PRINT+B.BVT_HEAT_SILICON+B.BVT_EMBROIDERY+B.BVT_TPR+B.BVT_WELDING+ISNULL(B.BVT_QUILTING,'0') + ISNULL(B.BVT_DIGITAL_PRINT,'0')+ ISNULL(B.BVT_LABEL_PRINT,'0')+ISNULL(B.BVT_LINE_CHARGE,'0')) AS TOT_CMPT,
           D.CD_NAME AS NEGO_TYPE_NAME,
           B.REMARK,
           B.NEGO_TYPE,
           B.STS_CMPT,
           A.ORDER_STATUS,
           B.NEGO_SEQ, 
           LEFT(A.ORDER_CD,2) as BUYER_CD, 
           A.FACTORY_CD 

				FROM KSV_ORDER_MST A
               LEFT JOIN KSV_PO_MEM E ON  E.ORDER_CD = A.ORDER_CD AND E.PO_SEQ = 1,
             KSV_ORDER_CMPT B
               LEFT JOIN KCD_CODE D  ON D.CD_GROUP = 'FC_NEGO_TYPE' AND D.CD_CODE = B.NEGO_TYPE,
             KCD_STYLE C
				WHERE A.STYLE_CD <> '00-0000' 
				AND A.FC_NEGO_TYPE <> '0' 
				AND A.ORDER_STATUS <> '4' 
				AND A.ORDER_TYPE IN ('0','1') 
				AND B.ORDER_CD = A.ORDER_CD 
				AND B.NEGO_SEQ = (SELECT MAX(NEGO_SEQ) FROM KSV_ORDER_CMPT WHERE ORDER_CD = A.ORDER_CD) 
				AND C.STYLE_CD = A.STYLE_CD 
				AND D.CD_GROUP = 'FC_NEGO_TYPE' AND D.CD_CODE = B.NEGO_TYPE 
				AND A.ORDER_CD LIKE '%${args.data.ORDER_CD}%' 


           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       PO_CD:'', 
       ORDER_CD:'', 
       STYLE_NAME:'', 
       DUE_DATE:'', 
       TOT_CNT:0, 
       FAC_TYPE:'', 
       BVT_CMPT:0, 
       BVT_SCREEN_PRINT:0, 
       BVT_HEAT_PRINT:0, 
       BVT_EMBROIDERY:0, 
       BVT_TPR:0, 
       BVT_WELDING:0, 
       BVT_QUILTING:0, 
       BVT_DIGITAL_PRINT:0, 
       BVT_LABEL_PRINT:0, 
       BVT_LINE_CHARGE:0, 
       TOT_CMPT:0, 
       NEGO_TYPE_NAME:'', 
       REMARK:'', 
       NEGO_TYPE:'', 
       STS_CMPT:0, 
       ORDER_STATUS:'', 
       NEGO_SEQ:0, 
       BUYER_CD:'', 
       FACTORY_CD:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 


       for (tIdx = 0; tIdx < tRet.length; tIdx ++) {
          var tObj = tRet[tIdx];

          var p = 0;
          var h = 0;
          var e = 0;
          var r = 0;
          var w = 0;
          var q = 0;
          var d = 0;
          var l = 0;

          if (tObj.NEGO_TYPE === '0') {

             let tSQL1 = `
					      select c.matl_type,(isnull(sum(a.use_qty*d.matl_price),0) / ${tObj.TOT_CNT}) as tot_value
					      from ksv_po_mrp a,kcd_matl_mst c,kcd_matl_mem d
					      where a.po_cd = '${tObj.PO_CD}'
					      and a.order_cd = '${tObj.ORDER_CD}' 
					      and c.matl_cd = a.matl_cd 
					      and c.matl_type in ('P','H','E','R','W','Q','D','L') 
					      and d.matl_cd = a.matl_cd 
				        and d.matl_seq = (select max(matl_seq) from kcd_matl_mem where c.matl_cd=matl_cd) 
					      and c.vendor_cd in ('V0882','V1838','V2078') 
					      group by c.matl_type 
             `;
             var tRet1 =  await prisma.$queryRaw(Prisma.raw(tSQL1));
             var tIdx1 = 0;
             for (tIdx1 = 0; tIdx1 < tRet1.length; tIdx1 ++) {
                var tObj1 = tRet1[tIdx1];
                if (tObj1.matl_type === 'P') {
                    p = p + tObj1.tot_value;
                    tObj.BVT_SCREEM_PRINT = p;
                }
                if (tObj1.matl_type === 'H') {
                    h = h + tObj1.tot_value;
                    tObj.BVT_HEAT_PRINT = h;
                }
                if (tObj1.matl_type === 'E') {
                    e = e + tObj1.tot_value;
                    tObj.BVT_EMBROIDERY = e;
                }
                if (tObj1.matl_type === 'R') {
                    r = r + tObj1.tot_value;
                    tObj.BVT_TPR = r;
                }
                if (tObj1.matl_type === 'W') {
                    w = w + tObj1.tot_value;
                    tObj.BVT_WELDING = w;
                }
                if (tObj1.matl_type === 'Q') {
                    q = q + tObj1.tot_value;
                    tObj.BVT_QUILTING = q;
                }
                if (tObj1.matl_type === 'D') {
                    d = d + tObj1.tot_value;
                    tObj.BVT_DIGITAL_PRINT = d;
                }
                if (tObj1.matl_type === 'L') {
                    l = l + tObj1.tot_value;
                    tObj.BVT_LABEL_PRINT = l;
                }
             }
             tObj.FAC_TYPE = 'STS';
          }

          if (tObj.ORDER_STATUS >= '2') { 
                let tSQL2 = `
					        select c.matl_type,(isnull(sum(a.use_qty*d.matl_price),0) / ${tObj.TOT_CNT}) as tot_value
					        from ksv_po_mrp a,kcd_matl_mst c,kcd_matl_mem d
					        where a.po_cd = '${tObj.PO_CD}'
					        and a.order_cd = '${tObj.ORDER_CD}' 
					        and c.matl_cd = a.matl_cd 
					        and c.matl_type in ('P','H','E','R','W','Q','D','L') 
					        and d.matl_cd = a.matl_cd 
				          and d.matl_seq = a.matl_seq 
					        group by c.matl_type 
                `;
                var tRet2 =  await prisma.$queryRaw(Prisma.raw(tSQL2));

                var tIdx2 = 0;
                for (tIdx2 = 0; tIdx2 < tRet2.length; tIdx2 ++) {
                   var tObj1 = tRet2[tIdx2];
                   if (tObj1.matl_type === 'P') tObj.BVT_SCREEM_PRINT = tObj1.tot_value;
                   if (tObj1.matl_type === 'E') tObj.BVT_EMBROIDERY = tObj1.tot_value;
                   if (tObj1.matl_type === 'R') tObj.BVT_TPR = tObj1.tot_value;
                   if (tObj1.matl_type === 'W') tObj.BVT_WELDING = tObj1.tot_value;
                   if (tObj1.matl_type === 'Q') tObj.BVT_QUILTING = tObj1.tot_value;
                   if (tObj1.matl_type === 'D') tObj.BVT_DIGITAL_PRINT = tObj1.tot_value;
                   if (tObj1.matl_type === 'L') tObj.BVT_LABEL_PRINT = tObj1.tot_value;
                }
          } else {
                var tTypeArray = ['P', 'E', 'R', 'W', 'Q', 'D' , 'L'];
                var tTypeIdx = 0; 
                for (tTypeIdx = 0; tTypeIdx < tTypeArray.length; tTypeIdx ++) {
                  var tTypeOne = tTypeArray[tTypeIdx];
                  let tSQL3 = `
						         select distinct c.matl_type,isnull(b.net*d.matl_price,0) as tot_value
						         from ksv_order_mem a,ksv_prod_mem b,kcd_matl_mst c,kcd_matl_mem d 
						         where a.order_cd = '${tObj.ORDER_CD}'
						         and b.prod_cd = a.prod_cd 
						         and c.matl_cd = b.matl_cd 
					           and c.matl_type in ('${tTypeOne}') 
						         and d.matl_cd = b.matl_cd 
						         and a.add_flag = 0 
						         and d.matl_seq = (select max(matl_seq) from kcd_matl_mem where matl_cd = b.matl_cd)
                  `;
                  var tRet3 =  await prisma.$queryRaw(Prisma.raw(tSQL3));

                  var tObj1 = tRet3[0];
                  if (tObj1.matl_type === 'P') tObj.BVT_SCREEM_PRINT = tObj1.tot_value;
                  if (tObj1.matl_type === 'E') tObj.BVT_EMBROIDERY = tObj1.tot_value;
                  if (tObj1.matl_type === 'R') tObj.BVT_TPR = tObj1.tot_value;
                  if (tObj1.matl_type === 'W') tObj.BVT_WELDING = tObj1.tot_value;
                  if (tObj1.matl_type === 'Q') tObj.BVT_QUILTING = tObj1.tot_value;
                  if (tObj1.matl_type === 'D') tObj.BVT_DIGITAL_PRINT = tObj1.tot_value;
                  if (tObj1.matl_type === 'L') tObj.BVT_LABEL_PRINT = tObj1.tot_value;
                }
          }

          tRetArray.push(tObj);
       }

       return (tRetArray);
    },
  },
};

export default moduleQueryS0BVT_05_5_NegoCmpt_Detail; 
