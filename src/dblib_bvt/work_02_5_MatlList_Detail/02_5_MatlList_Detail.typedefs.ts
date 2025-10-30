// MGR_02_5_MatlList_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_02_5_MatlList_Detail = gql`
  type T_BVT_02_5_MatlList_Detail {
       MATL_TYPE2:String 
       MATL_CD:String 
       MATL_TYPE_NAME:String 
       VENDOR_NAME:String 
       MATL_NAME:String 
       COLOR:String 
       SPEC:String 
       MATL_UNIT_NAME:String 
       MATL_PRICE:Float 
       CURR_CD:String 
       MATL_SPRICE:Float 
       SCURR_CD:String 
       WEIGHT:Float 
       BOX_UNIT_NAME:String 
       STATUS_NAME:String 
       HS_CD:String 
       ADD_RATE:Float 
       ADD_AMT:Float 
       ADD_LOSS:Float 
       BVT_MATL_NAME:String 

  }

  input I_BVT_02_5_MatlList_Detail {
      MATL_CD:String
  }

  type Query {
    mgrQueryS0BVT_02_5_MatlList_Detail(data:I_BVT_02_5_MatlList_Detail!): [T_BVT_02_5_MatlList_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_02_5_MatlList_Detail;
