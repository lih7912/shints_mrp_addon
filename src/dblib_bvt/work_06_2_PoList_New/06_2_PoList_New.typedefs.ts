// MGR_06_2_PoList_New.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_06_2_PoList_New = gql`
  type T_BVT_06_2_PoList_New {
       PO_CD:String 
       PO_SEQ:Int 
       ORDER_CD:String 
       VENDOR_NAME:String 
       MATL_CD:String 
       MATL_NAME:String 
       COLOR:String 
       SPEC:String 
       USE_PO_TYPE_NAME:String 
       USE_QTY:Float 
       DIFF_QTY:Float 
       PO_QTY:Float 
       ADJ_PO_QTY:Float 
       DIFF_PO_TYPE_NAME:String 
       UNIT:String 
       MATL_PRICE:Float 
       CURR_CD:String 
       TOT_AMT:Float 
       MRP_SEQ:Int 
       MATL_SEQ:Int 
       REG_DATETIME:String 
       USE_PO_TYPE:String 
       DIFF_PO_TYPE:String 
       PO_MATL_CD:String 
       VENDOR_CD:String 
       STOCK_QTY:Float 
       LEFT_QTY:Float 

  }

  input I_BVT_06_2_PoList_New {
      PO_CD:String
      PO_SEQ:String
  }

  type Query {
    mgrQueryS0BVT_06_2_PoList_New(data:I_BVT_06_2_PoList_New!): [T_BVT_06_2_PoList_New!]!
  }

`;

export default moduleTypedefsS0BVT_06_2_PoList_New;
