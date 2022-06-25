export interface I_Integrations_Ideasoft_Product {
  id: number;
  name: string;
  slug: string;
  fullName: string;
  sku: string;
  barcode: string;
  price1: number;
  warranty: number;
  tax: number;
  stockAmount: number;
  volumetricWeight: number;
  buyingPrice: number;
  discount: number;
  discountType: number;
  stockTypeLabel: string;
  moneyOrderDiscount: number;
  status: number;
  taxIncluded: number;
  distributor: string;
  isGifted: number;
  gift: string;
  customShippingDisabled: number;
  customShippingCost: number;
  marketPriceDetail: string;
  createdAt: string;
  updatedAt: string;
  metaKeywords: string;
  metaDescription: string;
  canonicalUrl: string;
  pageTitle: string;
  hasOption: number;
  shortDetails: string;
  searchKeywords: string;
  installmentThreshold: string;
  brand: {
    id: number;
    name: "Gümüşistan" | string;
    distributorCode: string;
  };
  currency: {
    id: 3 | number;
    label: "TL" | string;
    abbr: "TL" | string;
  };
  parent: null | I_Integrations_Ideasoft_Product;
  countdown: null;
  prices: any[];
  images: I_Integrations_Ideasoft_Image[];
  details: I_Integrations_Ideasoft_Details[];
  productToCategories: I_Integrations_Ideasoft_Category[];
}

export interface I_Integrations_Ideasoft_Product_Converted
  extends Pick<
    I_Integrations_Ideasoft_Product,
    "id" | "name" | "sku" | "status" | "price1" | "discount"
  > {
  images: string[];
}

export interface I_Integrations_Ideasoft_Image {
  id: number;
  filename: string | "kc001";
  extension: string | "jpg";
  directoryName: string | "assets";
  revision: string;
  sortOrder: number;
}

export interface I_Integrations_Ideasoft_Details {
  id: number;
  details: string;
  extraDetails: string;
}

export interface I_Integrations_Ideasoft_Category {
  id: number;
  sortOrder: null;
  category: {
    id: number;
    name: string;
    distributorCode: string;
  };
}

export interface I_Integrations_Ideasoft_ApiRequest_Products_Params {
  page: number | 1;
  limit: number | 100;
  sinceId: number | 0;
  ids: string;
  parent: string;
  brand: number;
  sku: string;
  name: string;
  distributor: string;
  stockAmount: number;
  startDate: string | "yyyy-mm-dd hh:mm:ss";
  endDate: string | "yyyy-mm-dd hh:mm:ss";
  startUpdatedAt: string | "yyyy-mm-dd hh:mm:ss";
  endUpdatedAt: string | "yyyy-mm-dd hh:mm:ss";
}

export interface I_Integrations_Ideasoft_Order {
  id: number;
  customerFirstname: string;
  customerSurname: string;
  customerEmail: string;
  customerPhone: string;
  paymentTypeName: string;
  paymentProviderCode: string;
  paymentProviderName: string;
  paymentGatewayCode: string;
  paymentGatewayName: string;
  bankName: string;
  clientIp: string;
  userAgent: string;
  currency: string;
  currencyRates: string;
  amount: number;
  couponDiscount: number;
  taxAmount: number;
  totalCustomTaxAmount: null;
  promotionDiscount: number;
  generalAmount: number;
  shipmentAmount: number;
  additionalServiceAmount: number;
  finalAmount: number;
  sumOfGainedPoints: number;
  installment: number;
  installmentRate: number;
  extraInstallment: number;
  transactionId: string;
  hasUserNote: string;
  status: string;
  paymentStatus: string;
  errorMessage: string;
  deviceType: string;
  referrer: string;
  invoicePrintCount: number;
  useGiftPackage: number;
  giftNote: string;
  memberGroupName: string;
  usePromotion: number;
  shippingProviderCode: string;
  shippingProviderName: string;
  shippingCompanyName: string;
  shippingPaymentType: string;
  shippingTrackingCode: string;
  source: string;
  createdAt: string;
  updatedAt: string;
  maillist: string;
  member: {
    id: number;
    firstname: string;
    surname: string;
    email: string;
    phoneNumber: string;
    gender: string;
    mobilePhoneNumber: string;
    address: string;
    status: string;
    memberGroup: {
      id: number;
      name: string;
    };
  };
  orderDetails: { id: number; varKey: string; varValue: string }[];
  orderItems: ({
    orderItemCustomizations: {
      id: number;
      productCustomizationGroupId: number;
      productCustomizationGroupName: string;
      productCustomizationGroupSortOrder: number;
      productCustomizationFieldId: number;
      productCustomizationFieldName: string;
      productCustomizationFieldType: string;
      productCustomizationFieldValue: string;
      cartItemAttributeId: number;
    }[];
    orderItemSubscription: null;
  } & {
    id: number,
    productName: string;
    productSku: string;
    productBarcode: string;
    productPrice: number;
    productCurrency: string;
    productQuantity: number;
    productDiscount: number;
    productTax: number;
    productMoneyOrderDiscount: number;
    productWeight: number;
    productStockTypeLabel: string;
    isProductPromotioned: number;
    discount: number;
    priceRatio: number;
    product: {
      id: number;
    }
  })[];
  orderCustomTaxLines: any[];
  shippingAddress: {
    id: number;
    firstname: string;
    surname: string;
    email: string;
    phoneNumber: string;
    mobilePhoneNumber: string;
    address: string;
    country: string;
    location: string;
    subLocation: string;
  };
  billingAddress: {
    id: number;
    firstname: string;
    surname: string;
    email: string;
    phoneNumber: string;
    mobilePhoneNumber: string;
    address: string;
    country: string;
    location: string;
    subLocation: string;
    invoiceType: string;
    taxNo: string;
    taxOffice: string;
    identityRegistrationNumber: string;
  };
}

export interface I_Integrations_Ideasoft_ApiRequest_Orders_Params
  extends Pick<
    I_Integrations_Ideasoft_ApiRequest_Products_Params,
    | "page"
    | "limit"
    | "sinceId"
    | "ids"
    | "startDate"
    | "startUpdatedAt"
    | "endDate"
    | "endUpdatedAt"
  > {
  sort: "id" | "-id";
  transactionId: string;
  customerEmail: string;
  member: number;
  status: string;
  paymentStatus: string;
  paymentTypeName: string;
  shippingProviderCode: string;
  q: string;
}
