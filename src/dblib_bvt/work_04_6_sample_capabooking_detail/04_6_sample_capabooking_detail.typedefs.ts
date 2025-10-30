// MGR_04_6_sample_capabooking_detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_04_6_sample_capabooking_detail = gql`
  type T_BVT_04_6_sample_capabooking_detail {
       BOOK_DATE:String 
       USER_ID:String 
       JOB_CD:String 
       IN_DATE:String 
       BUYER_CD:String 
       PO_CD:String 
       ORDER_CD:String 
       STYLE_CD:String 
       QTY:Int 
       STS_QTY:Int 
       COLOR:String 
       USE_SIZE:String 
       USAGE:String 
       MW:String 
       EMBRO:String 
       TP:String 
       SP:String 
       LTHR:String 
       G:String 
       W:String 
       S:String 
       FND:String 
       DL:String 
       M_ETA:String 
       SD:String 
       KIND:String 
       BVT_KIND:String 
       S_ETA:String 
       P_ETA:String 
       STOCK_FLAG:String 
       EXP_CMPT:Float 
       REMARK:String 
       TPR:Int 
       EMBOSSING:String 
       WASHING:String 
       CUT:String 
       FTP:String 
       DTP:String 
       LAZE:String 

  }

  input I_BVT_04_6_sample_capabooking_detail {
       BOOK_DATE:String 
  }

  type Query {
    mgrQueryS0BVT_04_6_sample_capabooking_detail(data:I_BVT_04_6_sample_capabooking_detail!): [T_BVT_04_6_sample_capabooking_detail!]!
  }

`;

export default moduleTypedefsS0BVT_04_6_sample_capabooking_detail;
