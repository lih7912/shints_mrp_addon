// MGR_neoe_currency.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_neoe_info = gql`
  type T_MA_CODEDTL {
       cd_field:String 
       cd_sysdef:String 
       nm_sysdef:String 
  }

  type T_MA_EXCHANGE {
       curr_sour:String 
       rate_base:String 
  }

  type T_FI_MNGD {
       cd_mngd:String 
       nm_mngd:String 
  }

  type T_NEOE_INFO {
       MA_CODEDTL:[T_MA_CODEDTL!]!
       MA_EXCHANGE:[T_MA_EXCHANGE!]!
       FI_MNGD:[T_FI_MNGD!]!
  }

  input I_NEOE_INFO {
       CURR_DATE:String
  }

  type Query {
    mgrQuery_neoe_info(data:I_NEOE_INFO!): T_NEOE_INFO!
  }

`;

export default moduleTypedefs_neoe_info;
