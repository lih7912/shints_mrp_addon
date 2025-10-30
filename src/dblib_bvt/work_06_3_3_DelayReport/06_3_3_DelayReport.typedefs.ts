// MGR_06_3_3_DelayReport.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_06_3_3_DelayReport = gql`
  type T_BVT_06_3_3_DelayReport {
       CURR_DATE:String 
       PO_CD:String 
       BUYER_CD:String 
       PO_CONF_DATE:String 
       PLAN_ETD:String 
       PLAN_ETA:String 
       VENDOR_NAME:String 
       MATL_CD:String 
       MATL_NAME:String 
       COLOR:String 
       SPEC:String 
       UNIT:String 
       PO_QTY:Float 
       BAL_QTY:Float 
       REMARK:String 
       EXP_DATE_1:String 
       ETD:String 
       ETA:String 
       DELIVERY:String 
       EXP_DATE:String 
       UPD_USER:String 
       SHIP_QTY:Int
       CUT_DATE:String
       ETD1:String
       ETA1:String
       DELAY_REASON:String
       DELIVERY_TYPE:String
       FARE_TYPE:String
       REMARK1:String
       EX_IN_DATE:String
  }

  input I_BVT_06_3_3_DelayReport {
      PO_CD:String
      FACTORY_CD:String
      S_PLAN_ETD:String
      E_PLAN_ETD:String
  }

  type Query {
    mgrQueryS0BVT_06_3_3_DelayReport(data:I_BVT_06_3_3_DelayReport!): [T_BVT_06_3_3_DelayReport!]!
  }

`;

export default moduleTypedefsS0BVT_06_3_3_DelayReport;
