// MGR_02_2_KindList_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_02_2_KindList_Detail = gql`
  type T_BVT_02_2_KindList_Detail {
       SEQ:String 
       MATL_TYPE2:String 
       BVT_MATL_NAME:String 

  }

  input I_BVT_02_2_KindList_Detail {
      KEY1:String
  }

  type Query {
    mgrQueryS0BVT_02_2_KindList_Detail(data:I_BVT_02_2_KindList_Detail!): [T_BVT_02_2_KindList_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_02_2_KindList_Detail;
