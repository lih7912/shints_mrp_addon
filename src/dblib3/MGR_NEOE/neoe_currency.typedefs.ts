// MGR_neoe_currency.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_neoe_currency = gql`
  type T_neoe_currency {
       CURR_SOUR:String 
       RATE_BASE:String 

  }

  input I_neoe_currency {
      KEY1:String
  }

  type Query {
    mgrQueryneoe_currency(data:I_neoe_currency!): [T_neoe_currency!]!
  }

`;

export default moduleTypedefs_neoe_currency;
