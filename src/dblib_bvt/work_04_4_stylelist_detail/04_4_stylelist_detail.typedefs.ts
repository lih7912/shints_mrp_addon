// MGR_04_4_stylelist_detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_04_4_stylelist_detail = gql`
  type T_BVT_04_4_stylelist_detail {
       STYLE_CD:String 
       STYLE_NAME:String 
       BUYER_NAME:String 
       KIND_NAME:String 
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
       EMBOSSING:String 
       WASHING:String 
       DOWN:String 
       CUT:String 
       FTP:String 
       DTP:String 
       LAZE:String 
       BUYER_CD:String 
       BVT_KIND:String 

  }

  input I_BVT_04_4_stylelist_detail {
       STYLE_CD:String 
  }

  type Query {
    mgrQueryS0BVT_04_4_stylelist_detail(data:I_BVT_04_4_stylelist_detail!): [T_BVT_04_4_stylelist_detail!]!
  }

`;

export default moduleTypedefsS0BVT_04_4_stylelist_detail;
