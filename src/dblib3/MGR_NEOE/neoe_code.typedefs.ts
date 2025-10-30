// MGR_neoe_code.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_neoe_code = gql`
  type T_neoe_code {
       nm_mngd:String 
       cd_mngd:String 

  }

  input I_neoe_code {
      KEY1:String
  }

  type Query {
    mgrQueryneoe_code(data:I_neoe_code!): [T_neoe_code!]!
  }

`;

export default moduleTypedefs_neoe_code;
