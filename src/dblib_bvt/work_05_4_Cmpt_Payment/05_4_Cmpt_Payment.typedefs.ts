// MGR_05_4_Cmpt_Payment.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_05_4_Cmpt_Payment = gql`
  type T_BVT_05_4_Cmpt_Payment {
       BUYER_CD:String 
       INVOICE_NO:String 
       PO_CD:String 
       ORDER_CD:String 
       STYLE_NAME:String 
       SHIP_PTYPE_NAME:String 
       SHIP_DATE:String 
       EXFACTORY:String 
       SHIP_CNT:Int 
       ORDER_PRICE:Float 
       BILL_PRICE:Float 
       CMPT_AMT:Float 
       BILL_CHECK_NAME:String 
       BILL_FLAG_NAME:String 
       FC_BILL_DATE:String 
       FC_CHK_FLAG:String 
       FC_BILL_FLAG:String 
       SHIP_PTYPE:String 
       FC_NEGO_TYPE:String 
       BVT_SCREEN_PRINT:Float 
       BVT_HEAT_SILICON:Float 
       BVT_EMBROIDERY:Float 
       BVT_TPR:Float 
       BVT_WELDING:Float 
       BVT_QUILTING:Float 
       BVT_DIGITAL_PRINT:Float 
       BVT_LABEL_PRINT:Float 
       BVT_LINE_CHARGE:Float 
       TOT_COST:Float 
       TOT_AMT:Float 
       REMARK:String 
       TOT_CNT:Int 

  }

  input I_BVT_05_4_Cmpt_Payment {
      ORDER_CD:String
  }

  type Query {
    mgrQueryS0BVT_05_4_Cmpt_Payment(data:I_BVT_05_4_Cmpt_Payment!): [T_BVT_05_4_Cmpt_Payment!]!
  }

`;

export default moduleTypedefsS0BVT_05_4_Cmpt_Payment;
