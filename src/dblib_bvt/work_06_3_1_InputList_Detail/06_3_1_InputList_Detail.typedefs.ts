// MGR_06_3_1_InputList_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_06_3_1_InputList_Detail = gql`
  type T_BVT_06_3_1_InputList_Detail {
       IO_STATUS:String 
       PO_CD:String 
       ORDER_CD:String 
       VENDOR_NAME:String 
       MATL_NAME:String 
       COLOR:String 
       SPEC:String 
       UNIT:String 
       IN_QTY:Float 
       TOT_QTY:Float 
       LC_QTY:Float 
       BILL_TYPE_NAME:String 
       IN_DATE:String 
       IN_TYPE_NAME:String 
       PAY_PRICE:Float 
       PAY_CURR_CD:String 
       PAY_DATE:String 
       PAY_REPORT:String 
       LC_BILL_NO:String 
       MATL_CD:String 
       MIN_FLAG:String 
       STOCK_QTY:Float 
       OUT_STATUS:String 
       OUT_QTY:Float 
       PO_SEQ:Int 
       MRP_SEQ:Int 
       IN_DATETIME:String 
       BILL_FLAG:String 
       IN_TYPE:String 
       VENDOR_TYPE:String 
       STOCK_IDX:String 
       CALC_FLAG:String 

  }

  input I_BVT_06_3_1_InputList_Detail {
      IN_DATETIME:String
      VENDOR_CD:String
  }

  type Query {
    mgrQueryS0BVT_06_3_1_InputList_Detail(data:I_BVT_06_3_1_InputList_Detail!): [T_BVT_06_3_1_InputList_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_06_3_1_InputList_Detail;
