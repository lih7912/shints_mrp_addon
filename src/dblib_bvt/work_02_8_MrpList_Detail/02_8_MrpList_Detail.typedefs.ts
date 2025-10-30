// MGR_02_8_MrpList_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_02_8_MrpList_Detail = gql`
  type T_BVT_02_8_MrpList_Detail {
       ORDER_CD:String 
       PROD_CD:String 
       ORDER_MRP_SEQ:Int 
       MATL_CD:String 
       NET:Float 
       LOSS:Float 
       GROSS:Float 
       USAGE:String 
       USE_SIZE:String 
       SEQ:Int 
       COUNTRY:String 
       REG_USER:String 
       REG_DATETIME:String 
       COLOR:String 
       TOT_QTY:Float 
       QUANTITY:Float 
       MATL_PRICE:Float 
       CURR_CD:String 

  }

  input I_BVT_02_8_MrpList_Detail {
      ORDER_CD:String
  }

  type Query {
    mgrQueryS0BVT_02_8_MrpList_Detail(data:I_BVT_02_8_MrpList_Detail!): [T_BVT_02_8_MrpList_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_02_8_MrpList_Detail;
