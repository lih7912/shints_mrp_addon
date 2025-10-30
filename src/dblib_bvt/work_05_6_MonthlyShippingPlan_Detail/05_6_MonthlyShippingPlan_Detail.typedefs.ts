// MGR_05_6_MonthlyShippingPlan_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_05_6_MonthlyShippingPlan_Detail = gql`
  type T_BVT_05_6_MonthlyShippingPlan_Detail {
       BUYER_CD:String 
       PO_CD:String 
       ORDER_CD:String 
       STYLE_NAME:String 
       TOT_CNT:Int 
       SHIP_CNT:Int 
       SHIP_PLAN_CNT:Int 
       USD_PRICE:Float 
       CURR_CD:String 
       FC_PRICE:Float 
       PLAN_AMT:Float 
       SHIP_AMT:Float 
       ORDER_BALANCE:Float 
       DUE_DATE:String 
       PAY_RULE_TERM_NAME:String 
       FACTORY_CD:String 
       POSS_DATE:String 
       PLAN_QTY:String 

  }

  input I_BVT_05_6_MonthlyShippingPlan_Detail {
      ORDER_CD:String
  }

  type Query {
    mgrQueryS0BVT_05_6_MonthlyShippingPlan_Detail(data:I_BVT_05_6_MonthlyShippingPlan_Detail!): [T_BVT_05_6_MonthlyShippingPlan_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_05_6_MonthlyShippingPlan_Detail;
