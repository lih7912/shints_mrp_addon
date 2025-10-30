// MGR_04_1_buyerlist_detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_04_1_buyerlist_detail = gql`
  type T_BVT_04_1_buyerlist_detail {
       BUYER_CD:String 
       CREDIT_RATING:String 
       BUYER_NAME:String 
       BUYER_ABBR:String 
       USER_NAME:String 
       EMAIL:String 
       TEL_NO:String 
       FAX_NO:String 
       NAT_NAME:String 
       ZIP_NO:String 
       ADDR1:String 
       ADDR2:String 
       STATUS_NAME:String 
       COMM_FLAG:String 
       BUYER_TEAM_NAME:String 
       LOSS_FLAG_NAME:String 
       REMARK:String 
       CREDIT_EXPIRE:String 

  }

  input I_BVT_04_1_buyerlist_detail {
       BUYER_CD:String 
  }

  type Query {
    mgrQueryS0BVT_04_1_buyerlist_detail(data:I_BVT_04_1_buyerlist_detail!): [T_BVT_04_1_buyerlist_detail!]!
  }

`;

export default moduleTypedefsS0BVT_04_1_buyerlist_detail;
