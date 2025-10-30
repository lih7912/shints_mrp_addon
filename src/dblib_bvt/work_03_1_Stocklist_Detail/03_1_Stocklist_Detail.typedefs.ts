// MGR_03_1_Stocklist_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_03_1_Stocklist_Detail = gql`
  type T_BVT_03_1_Stocklist_Detail {
       MATL_TYPE2:String 
       FACTORY_NAME:String 
       STOCK_DATE:String 
       REG_DATETIME:String 
       PO_CD:String 
       ORDER_CD:String 
       BUYER_NAME:String 
       VENDOR_NAME:String 
       MATL_CD:String 
       MATL_NAME:String 
       COLOR:String 
       SPEC:String 
       UNIT:String 
       STOCK_STATUS:String 
       RACK:String 
       LOCATION:String 
       WARE_NAME:String 
       WARE_DATE:String 
       STOCK_IDX:String 
       ORG_STOCK_IDX:String 
       ROOT_IDX:String 
       REMARK:String 
       EXP_DATE:String 
       FACTORY_CD:String 
       REASON_REMARK_NAME:String 
       PLAN_REMARK:String 
       CURR_CD:String 
       DEBIT_CD:String 
       REMARK0:String 
       REASON_REMARK:String 
       SL:String 

  }

  input I_BVT_03_1_Stocklist_Detail {
      MATL_CD:String
  }

  type Query {
    mgrQueryS0BVT_03_1_Stocklist_Detail(data:I_BVT_03_1_Stocklist_Detail!): [T_BVT_03_1_Stocklist_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_03_1_Stocklist_Detail;
