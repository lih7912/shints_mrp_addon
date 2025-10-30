// MGR_04_5_capabookiong_detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_04_5_capabookiong_detail = gql`
  type T_BVT_04_5_capabookiong_detail {
       BOOK_DATE:String 
       USER_ID:String 
       JOB_CD:String 
       IN_DATE:String 
       BUYER_CD:String 
       PO_CD:String 
       ORDER_CD:String 
       STYLE_CD:String 
       QTY:Int 
       NR:String 
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
       FOB:Float 
       SD:String 
       KIND:String 
       BVT_KIND:String 
       S_ETA:String 
       REMARK:String 
       TPR:Int 
       EMBOSSING:String 
       WASHING:String 
       DOWN:String 
       CUT:String 
       FTP:String 
       DTP:String 
       LAZE:String 
       STYLE_NAME:String 

  }

  input I_BVT_04_5_capabookiong_detail {
       BOOK_DATE:String 
  }

  type Query {
    mgrQueryS0BVT_04_5_capabookiong_detail(data:I_BVT_04_5_capabookiong_detail!): [T_BVT_04_5_capabookiong_detail!]!
  }

`;

export default moduleTypedefsS0BVT_04_5_capabookiong_detail;
