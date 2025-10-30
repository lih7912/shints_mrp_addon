// MGR_02_9_MrpPack_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_02_9_MrpPack_Detail = gql`
  type T_BVT_02_9_MrpPack_Detail {
       ORDER_CD:String 
       PO_CD:String 
       PO_SEQ:Int 
       MATL_CD:String 
       MATL_NAME:String 
       COLOR:String 
       SPEC:String 
       UNIT:String 
       PO_MATL_CD:String 
       RACK:String 
       USE_PO_TYPE_NAME:String 
       DIFF_PO_TYPE_NAME:String 
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

  input I_BVT_02_9_MrpPack_Detail {
      ORDER_CD:String
  }

  type Query {
    mgrQueryS0BVT_02_9_MrpPack_Detail(data:I_BVT_02_9_MrpPack_Detail!): [T_BVT_02_9_MrpPack_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_02_9_MrpPack_Detail;
