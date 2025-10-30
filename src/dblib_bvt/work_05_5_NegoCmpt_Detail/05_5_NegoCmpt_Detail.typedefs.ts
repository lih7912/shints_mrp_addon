// MGR_05_5_NegoCmpt_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_05_5_NegoCmpt_Detail = gql`
  type T_BVT_05_5_NegoCmpt_Detail {
       PO_CD:String 
       ORDER_CD:String 
       STYLE_NAME:String 
       DUE_DATE:String 
       TOT_CNT:Int 
       FAC_TYPE:String 
       BVT_CMPT:Float 
       BVT_SCREEN_PRINT:Float 
       BVT_HEAT_PRINT:Float 
       BVT_EMBROIDERY:Float 
       BVT_TPR:Float 
       BVT_WELDING:Float 
       BVT_QUILTING:Float 
       BVT_DIGITAL_PRINT:Float 
       BVT_LABEL_PRINT:Float 
       BVT_LINE_CHARGE:Float 
       TOT_CMPT:Float 
       NEGO_TYPE_NAME:String 
       REMARK:String 
       NEGO_TYPE:String 
       STS_CMPT:Float 
       ORDER_STATUS:String 
       NEGO_SEQ:Int 
       BUYER_CD:String 
       FACTORY_CD:String 
  }

  input I_BVT_05_5_NegoCmpt_Detail {
      ORDER_CD:String
  }

  type Query {
    mgrQueryS0BVT_05_5_NegoCmpt_Detail(data:I_BVT_05_5_NegoCmpt_Detail!): [T_BVT_05_5_NegoCmpt_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_05_5_NegoCmpt_Detail;
