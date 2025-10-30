// MGR_05_2_overage_shortage_detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_05_2_overage_shortage_detail = gql`
  type T_BVT_05_2_overage_shortage_detail {
       PO_CD:String 
       ORDER_CD:String 
       STYLE_NAME:String 
       TOT_CNT:Int 
       SHIP_CNT:Int 
       OVER_QTY:Int 
       SHORT_QTY:Int 
       VMD_QTY:String 
       VMD_SUB_QTY:String 
       SMD_QTY:String 
       LATEST_SHIP_DATE:String 
       CONFIRM_USER:String 
       CONFIRM_AMT:String 
       USD_PRICE:Float 
       FC_PRICE:Float 
       ORDER_STATUS_NAME:String 
       STS_COMMENT:String 
       BVT_COMMENT:String 
       SUP_QTY:String 
       BUYER_QTY:String 
       STS_QTY:String 
       REMARK:String 
       END_FLAG:String 
       END_DATE:String 
       FACTORY_NAME:String 
       TYPE:String 

  }

  input I_BVT_05_2_overage_shortage_detail {
      ORDER_CD:String
  }

  type Query {
    mgrQueryS0BVT_05_2_overage_shortage_detail(data:I_BVT_05_2_overage_shortage_detail!): [T_BVT_05_2_overage_shortage_detail!]!
  }

`;

export default moduleTypedefsS0BVT_05_2_overage_shortage_detail;
