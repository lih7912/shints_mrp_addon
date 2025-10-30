// MGR_02_4_Size_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_02_4_Size_Detail = gql`
  type T_BVT_02_4_Size_Detail {
       SIZE_GROUP:String 
       SIZE_MEMBER:String 

  }

  input I_BVT_02_4_Size_Detail {
       SIZE_GROUP:String 
  }

  type Query {
    mgrQueryS0BVT_02_4_Size_Detail(data:I_BVT_02_4_Size_Detail!): [T_BVT_02_4_Size_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_02_4_Size_Detail;
