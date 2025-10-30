// MGR_02_6_MatlPriceList_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_02_6_MatlPriceList_Detail = gql`
  type T_BVT_02_6_MatlPriceList_Detail {
       PO_CD:String 
       ORDER_CD:String 
       MATL_CD:String 
       IN_QTY:Float 
       PAY_DATE:String 
       PAY_CURR_CD:String 
       PAY_PRICE:Float 

  }

  input I_BVT_02_6_MatlPriceList_Detail {
      PO_CD:String
      ORDER_CD:String
      MATL_CD:String
      PAY_DATE:String
  }

  type Query {
    mgrQueryS0BVT_02_6_MatlPriceList_Detail(data:I_BVT_02_6_MatlPriceList_Detail!): [T_BVT_02_6_MatlPriceList_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_02_6_MatlPriceList_Detail;
