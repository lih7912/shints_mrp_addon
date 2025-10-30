// MGR_06_4_3_PaymentDetail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_06_4_3_PaymentDetail = gql`
  type T_BVT_06_4_3_PaymentDetail {
       ORDER_CD:String 
       MATL_CD:String 
       MATL_NAME:String 
       COLOR:String 
       SPEC:String 
       UNIT:String 
       PO_MATL_CD:String 
       RACK:String 
       CD_NAME:String 
       USE_QTY:Float 
       PO_QTY:Float 
       SUM_QTY:Float 
       VENDOR_NAME:String 
       STOCK_CHK:String 
       MRP_SEQ:Int 
       MATL_SEQ:Int 
       MATL_PRICE:Float 
       CURR_CD:String 
       PO_MRP_SEQ:Int 
       REG_DATETIME:String 
       STOCK_IDX:String 
       ROOT_IDX:String 

  }

  input I_BVT_06_4_3_PaymentDetail {
      PO_CD:String
      PO_SEQ:String
  }

  type Query {
    mgrQueryS0BVT_06_4_3_PaymentDetail(data:I_BVT_06_4_3_PaymentDetail!): [T_BVT_06_4_3_PaymentDetail!]!
  }

`;

export default moduleTypedefsS0BVT_06_4_3_PaymentDetail;
