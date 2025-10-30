
import { Prisma } from "@prisma/client";
import prisma from "../../db";  //PrismaClient 사용하기 위해 불러오기
const fs = require('fs');

// export default로 Query 내용 내보내기
const moduleQueryS0BVT_06_2_PoList_New = {
  Query: {
    mgrQueryS0BVT_06_2_PoList_New : async (_, args) => {
       var tSQL = '';
       if (args.data.STYLE_CD !== '') {
           tSQL += `AND STYLE_NAME like '%${args.data.STYLE_CD}%' `;
       }
       let sqlStr = `


				SELECT 
             A.PO_CD,
             A.PO_SEQ,
             A.ORDER_CD,
             D.VENDOR_NAME,
             A.MATL_CD,
             C.MATL_NAME,
             C.COLOR,
             C.SPEC,
             B.CD_NAME AS USE_PO_TYPE_NAME, 
				     A.USE_QTY,
             A.DIFF_QTY,
             A.PO_QTY,
             A.ADJ_PO_QTY,
				     E.CD_NAME AS DIFF_PO_TYPE_NAME,
             C.UNIT,
             A.MATL_PRICE,
             A.CURR_CD,
             A.TOT_AMT,
				     A.MRP_SEQ,
             A.MATL_SEQ,
             A.REG_DATETIME,
             A.USE_PO_TYPE,
             A.DIFF_PO_TYPE,
             A.PO_MATL_CD,
             A.ADJ_PO_QTY,
             D.VENDOR_CD 
				FROM KSV_PO_MRP A 
             LEFT JOIN KCD_CODE B ON B.CD_GROUP = 'USE_PO_TYPE' AND B.CD_CODE = A.USE_PO_TYPE
             LEFT JOIN KCD_CODE E ON E.CD_GROUP = 'DIFF_PO_TYPE' AND E.CD_CODE = A.DIFF_PO_TYPE,
             KCD_MATL_MST C,KCD_VENDOR D 
				WHERE A.PO_CD = '${args.data.PO_CD}'
				AND C.MATL_CD = A.MATL_CD 
				AND D.VENDOR_CD  = C.VENDOR_CD 
				ORDER BY D.VENDOR_NAME,C.MATL_NAME,C.COLOR,C.SPEC 

           
         `;
       var tRet  =  await prisma.$queryRaw(Prisma.raw(sqlStr));
       var tRetData = {

       PO_CD:'', 
       PO_SEQ:0, 
       ORDER_CD:'', 
       VENDOR_NAME:'', 
       MATL_CD:'', 
       MATL_NAME:'', 
       COLOR:'', 
       SPEC:'', 
       USE_PO_TYPE_NAME:'', 
       USE_QTY:0, 
       DIFF_QTY:0, 
       PO_QTY:0, 
       ADJ_PO_QTY:0, 
       DIFF_PO_TYPE_NAME:'', 
       UNIT:'', 
       MATL_PRICE:0, 
       CURR_CD:'', 
       TOT_AMT:0, 
       MRP_SEQ:0, 
       MATL_SEQ:0, 
       REG_DATETIME:'', 
       USE_PO_TYPE:'', 
       DIFF_PO_TYPE:'', 
       PO_MATL_CD:'', 
       ADJ_PO_QTY:0, 
       VENDOR_CD:'', 
       ETC99:'' 

       };
       var tRetArray = [];
       var tIdx = 0; 

       for (tIdx = 0; tIdx < tRet.length; tIdx ++) {
          var tOne = tRet[tIdx];
          tOne.LEFT_QTY = 0;
          tOne.STOCK_QTY = 0;


          var tStockQty = 0;
          if (tOne.PO_MATL_CD === '재고발주') {
             let sqlStr1 = `

					     select isnull(sum(po_qty),0)  as po_qty_1
					     from ksv_po_mrp  
					     where po_cd = '${tOne.PO_CD}' 
					     and po_seq = ${tOne.PO_SEQ} 
					     and po_matl_cd = '${tOne.PO_MATL_CD}' 
					     and po_mrp_seq = ${tOne.MRP_SEQ} 

             `;
             var tRet1  =  await prisma.$queryRaw(Prisma.raw(sqlStr1));
             var tRet2 = tRet1[0];
             tStockQty = tRet2.po_qty_1;
             // console.log(tStockQty);
             tOne.STOCK_QTY = tStockQty;
             
          }
          // console.log("STEP-1=>" + tOne.PO_MATL_CD + "/" + tOne.DIFF_PO_TYPE + "/" + tOne.PO_QTY + "/" + tOne.STOCK_QTY);

          if (args.data.PO_SEQ === '' || args.data.PO_SEQ === '1') {
          // console.log("STEP-1-1=>" + tOne.PO_MATL_CD + "/" + tOne.DIFF_PO_TYPE + "/" + tOne.PO_QTY + "/" + tOne.STOCK_QTY);
             if (tOne.DIFF_PO_TYPE === '1') {
                tOne.PO_QTY = 0;
                tOne.LEFT_QTY = tOne.DIFF_QTY;
                tOne.DIFF_QTY = tOne.DIFF_QTY * (-1);
             }
             else if (tOne.DIFF_PO_TYPE === '2') {
                if (tOne.DIFF_PO_TYPE_NAME !== 'ADD') {
                   tOne.DIFF_QTY = tOne.DIFF_QTY * (-1);
                }
             }
             else if (tOne.DIFF_PO_TYPE === '3') {
                tOne.PO_QTY = tOne.USE_QTY - tStockQty;
                tOne.DIFF_QTY = tOne.USE_QTY;
          // console.log("STEP-1-2=>" + tStockQty + "," + tOne.USE_QTY  + "," + tStockQty + "," + tOne.PO_QTY  );
             }
             else if (tOne.DIFF_PO_TYPE === '4') {
                if (tOne.DIFF_PO_TYPE_NAME !== 'ADD') {
                   tOne.DIFF_QTY = tOne.DIFF_QTY * (-1);
                }
             }
             else if (tOne.DIFF_PO_TYPE === '5') {
                tOne.DIFF_QTY = tOne.DIFF_QTY * (-1);
                tOne.LEFT_QTY = tOne.PO_QTY;
             }
          }
          else if (parseInt(args.data.PO_SEQ) < 100) {
             if (tOne.DIFF_PO_TYPE === '1') {
                tOne.PO_QTY = 0;
                tOne.LEFT_QTY = tOne.DIFF_QTY;
                tOne.DIFF_QTY = tOne.DIFF_QTY * (-1);
              }
              if (tOne.DIFF_PO_TYPE === '2') {
                if (tOne.DIFF_PO_TYPE_NAME !== 'ADD') {
                   tOne.DIFF_QTY = tOne.DIFF_QTY * (-1);
                   tOne.PO_QTY = tOne.LEFT_QTY - tOne.STOCK_QTY;
                } else {
                   tOne.PO_QTY = tOne.DIFF_QTY;
                }
              }
              if (tOne.DIFF_PO_TYPE === '4') {
                if (tOne.DIFF_PO_TYPE_NAME !== 'ADD') {
                   tOne.DIFF_QTY = tOne.DIFF_QTY * (-1);
                   tOne.PO_QTY = tOne.LEFT_QTY - tOne.STOCK_QTY;
                }
              }
          } 
          else if (tOne.DIFF_PO_TYPE === '3') {
            tOne.PO_QTY = tOne.DIFF_QTY;
          }
          else if (tOne.DIFF_PO_TYPE === '5') {
            tOne.DIFF_QTY = tOne.DIFF_QTY * (-1);
            tOne.PO_QTY = tOne.DIFF_QTY;
          }

          // console.log("STEP-2=>" + tOne.PO_MATL_CD + "/" + tOne.DIFF_PO_TYPE + "/" + tOne.PO_QTY);

          tRetArray.push(tOne);

       }
       return (tRetArray);
    },
  },
};

export default moduleQueryS0BVT_06_2_PoList_New; 
