export interface I_Integrations_Trendyol_Product {
  barcode: string;
  title: string;
  productMainId: string;
  brandId: number;
  categoryId: number;
  quantity: number;
  stockCode: string;
  dimensionalWeight: number;
  description: string;
  currencyType: "TRY";
  listPrice: number;
  salePrice: number;
  cargoCompanyId: number;
  deliveryDuration?: 3 | number;
  images: { url: string }[];
  vatRate: 18;

  shipmentAddressId?: number;
  returningAddressId?: number;
  attributes: I_Integrations_Trendyol_Attribute[];
}

export type I_Integrations_Trendyol_Product_Requireds = Pick<
  I_Integrations_Trendyol_Product,
  | "title"
  | "categoryId"
  | "stockCode"
  | "listPrice"
  | "salePrice"
  | "images"
  | "attributes"
>;

export interface I_Integrations_Trendyol_Attribute {
  attributeId: number;
  attributeValueId?: number;
  customAttributeValue?: any;
}

export interface I_Integrations_Trendyol_Category {
  id: number;
  name: string;
  parentId: number;
  subCategories: I_Integrations_Trendyol_Category[];
}

export interface I_Integrations_Trendyol_BatchResult {
  batchRequestId: string;
  items: any[];
  status: string;
  creationDate: number;
  lastModification: number;
  sourceType: string;
  itemCount: number;
  failedItemCount: number;
}

export interface I_Integrations_Trendyol_BatchResult_Item {
  requestItem: {
    product: I_Integrations_Trendyol_Product;
  };
  status: "SUCCESS" | "FAILED";
  failureReasons: string[];
}

export interface I_Integrations_Trendyol_GetProductsItem
  extends I_Integrations_Trendyol_Product {
  approved: boolean;
  archived: boolean;
  batchRequestId: string;
  brand: string;
  categoryName: string;
  createDateTime: number;
  gender: string;
  hasActiveCampaign: boolean;
  id: string;
  lastPriceChangeDate: number;
  lastStockChangeDate: number;
  lastUpdateDate: number;
  locked: boolean;
  onSale: boolean;
  pimCategoryId: number;
  platformListingId: string;
  supplierId: number;
  version: number;
  categoryMaxPrice: number;
  categoryMinPrice: number;
  rejected: boolean;
  rejectReasonDetails?: [
    {
      rejectReason: string;
      rejectReasonDetail: string;
    }
  ];

  blacklisted: false;
}

export interface I_Integrations_Trendyol_ApiResponse_Products_Success {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: I_Integrations_Trendyol_GetProductsItem[];
}

export interface I_Integrations_Trendyol_ApiRequest_Products_Params {
  approved: boolean;
  barcode: string;
  startDate: string;
  endDate: string;
  page: 0 | number | 2500;
  size: number;
  supplierId: number;
  stockCode: string;
  archived: boolean;
  productMainId: string;
}

export type I_Integrations_Trendyol_Order_StatusTypes = "Created" | "Picking"  | "Invoiced" | "Shipped" | "Cancelled" | "Delivered" | "UnDelivered" | "Returned" | "Repack" | "UnPacked" | "UnSupplied";

export interface I_Integrations_Trendyol_ApiRequest_Orders_Params extends Pick<I_Integrations_Trendyol_ApiRequest_Products_Params, "startDate" | "endDate" | "page" | "size"> {
  supplierId: number;
  orderNumber: number;
  status: I_Integrations_Trendyol_Order_StatusTypes;
  orderByField: string;
  orderByDirection: "ASC" | "DESC";
  shipmentPackageIds: number;
}

export interface I_Integrations_Trendyol_RootUser {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  cityCode: number;
  district: string;
  districtId: number;
  postalCode: string;
  countryCode: string;
  neighborhoodId: number;
  neighborhood: string;
  phone: string;
  fullAddress: string;
  fullName: string;
}

export interface I_Integrations_Trendyol_DiscountDetailItem {
  lineItemPrice: number;
  lineItemDiscount: number;
}

export interface I_Integrations_Trendyol_LineItem {
  quantity: number;
  salesCampaignId: number;
  productSize: string;
  merchantSku: string;
  productName: string;
  productCode: number;
  merchantId: number;
  amount: number;
  discount: number;
  discountDetails: I_Integrations_Trendyol_DiscountDetailItem[];
  currencyCode: string;
  productColor: string;
  id: number;
  sku: string;
  vatBaseAmount: number;
  barcode: string;
  orderLineItemStatusName: string;
  price: number;
}

export interface I_Integrations_Trendyol_Order {
  shipmentAddress: I_Integrations_Trendyol_RootUser;
  orderNumber: string;
  grossAmount: number;
  totalDiscount: number;
  taxNumber: number;
  invoiceAddress: I_Integrations_Trendyol_RootUser;
  customerFirstName: string;
  customerEmail: string;
  customerLastName: string;
  id: number;
  cargoTrackingNumber: number;
  cargoProviderName: string;
  lines: I_Integrations_Trendyol_LineItem[];
  orderDate: number;
  tcIdentityNumber: string;
  currencyCode: string;
  packageHistories: {createdDate: number; status: I_Integrations_Trendyol_Order_StatusTypes}[];
  shipmentPackageStatus: I_Integrations_Trendyol_Order_StatusTypes;
  deliveryType: 'normal';
  timeSlotId: number;
  scheduledDeliveryStoreId: string;
  estimatedDeliveryStartDate: number;
  estimatedDeliveryEndDate: number;
  totalPrice: number;
  deliveryAddressType: string;
  agreedDeliveryDate: number;
  fastDelivery: boolean;
  originShipmentDate: number;
}

export interface I_Integrations_Trendyol_ApiResponse_Orders_Success {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: I_Integrations_Trendyol_Order[];
}
