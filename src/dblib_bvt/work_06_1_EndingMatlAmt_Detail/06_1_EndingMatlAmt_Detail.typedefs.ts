// MGR_06_1_EndingMatlAmt_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_06_1_EndingMatlAmt_Detail = gql`
  type T_BVT_06_1_EndingMatlAmt_Detail {
       PO_CD:String 
       BUYER_CD:String 
       MATL_CD:String 
       MATL_NAME:String 
       COLOR:String 
       SPEC:String 
       TOT_QTY:Float 
       IN_QTY:Float 
       IN_CURR_CD:String 
       IN_PRICE:Float 
       PAY_CURR_CD:String 
       PAY_PRICE:Float 
       MATL_PRICE:Float 
       TT_FLAG:String 
       WARE_NAME:String 
       TOT_PRICE:Float 
       END_FLAG:String 
       END_DATE:String 
       PAY_DATE:String 
       BILL_FLAG:String 
       BILL_DATE:String 
       VENDOR_NAME:String 
       PO_SEQ:Int 
       ORDER_CD:String 
       MRP_SEQ:Int 
       IN_DATETIME:String 
       MATL_SEQ:Int 
       CALC_FLAG:String 
       VENDOR_CD:String 
       PUR_FACTORY:String 
       PAY_REPORT:String 

  }

  input I_BVT_06_1_EndingMatlAmt_Detail {
      IN_DATETIME:String
      VENDOR_CD:String
  }

  type Query {
    mgrQueryS0BVT_06_1_EndingMatlAmt_Detail(data:I_BVT_06_1_EndingMatlAmt_Detail!): [T_BVT_06_1_EndingMatlAmt_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_06_1_EndingMatlAmt_Detail;
