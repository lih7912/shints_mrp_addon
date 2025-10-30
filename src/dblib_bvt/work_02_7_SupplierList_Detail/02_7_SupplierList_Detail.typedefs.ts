// MGR_02_7_SupplierList_Detail.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from "apollo-server";

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefsS0BVT_02_7_SupplierList_Detail = gql`
  type T_BVT_02_7_SupplierList_Detail {
       VENDOR_CD:String 
       VENDOR_NAME:String 
       INVOICE_NAME:String 
       VENDOR_TYPE_NAME:String 
       VENDOR_MATL_TYPE_NAME:String 
       GW_STATUS_NAME:String 
       REG_NO:String 
       PRESIDENT:String 
       USER_NAME:String 
       PART:String 
       RANK:String 
       EMAIL:String 
       TEL_NO:String 
       FAX_NO:String 
       PAY_TYPE:String 
       NAT_NAME:String 
       ZIP_NO:String 
       ADDR1:String 
       ADDR2:String 
       STATUS_NAME:String 
       REG_USER:String 
       PERMIT:String 
       GW_USER_NAME:String 
       APPROKEY:String 
       NEOE_NO:String 
       LEAD_TIME:String 
       REMARK:String 

  }

  input I_BVT_02_7_SupplierList_Detail {
      VENDOR_CD:String 
  }

  type Query {
    mgrQueryS0BVT_02_7_SupplierList_Detail(data:I_BVT_02_7_SupplierList_Detail!): [T_BVT_02_7_SupplierList_Detail!]!
  }

`;

export default moduleTypedefsS0BVT_02_7_SupplierList_Detail;
