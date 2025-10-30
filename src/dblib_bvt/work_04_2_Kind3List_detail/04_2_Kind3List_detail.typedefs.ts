// MGR_04_2_Kind3List_detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_04_2_Kind3List_detail = gql`
  type T_BVT_04_2_Kind3List_detail {
       CD_CODE:String 
       CD_NAME:String 
       CD_FLAG:String 

  }

  input I_BVT_04_2_Kind3List_detail {
      KEY1:String
  }

  type Query {
    mgrQueryS0BVT_04_2_Kind3List_detail(data:I_BVT_04_2_Kind3List_detail!): [T_BVT_04_2_Kind3List_detail!]!
  }

`;

export default moduleTypedefsS0BVT_04_2_Kind3List_detail;
