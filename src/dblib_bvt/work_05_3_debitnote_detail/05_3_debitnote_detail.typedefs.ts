// MGR_05_3_debitnote_detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_05_3_debitnote_detail = gql`
  type T_BVT_05_3_debitnote_detail {
       CRDB_CD:String 
       CRDB_DATE:String 
       BUYER_CD:String 
       CURR_CD:String 
       TITLE:String 
       CHARGER:String 
       CONF_FLAG:String 
       CONF_USER:String 
       CREDIT_STATUS_NAME:String 
       REMARK:String 
       REMARK_S:String 
       DEBIT_TYPE_NAME:String 
       HISTORY_NO:String 
       DEBIT_BL_NO:String 
       CI_NO:String 
       TRANSPORTATION:String 
       TOT_AMT:Float 
       WEIGHT:Float 
       TOT_CBM:Float 
       CBM:Float 
       BUYER_TEAM:String 
  }

  input I_BVT_05_3_debitnote_detail {
       CRDB_CD:String 
  }

  type Query {
    mgrQueryS0BVT_05_3_debitnote_detail(data:I_BVT_05_3_debitnote_detail!): [T_BVT_05_3_debitnote_detail!]!
  }

`;

export default moduleTypedefsS0BVT_05_3_debitnote_detail;
