export interface ProductDto {
  bizGroupInfos: BizGroupInfo[];
  productInfo: ProductInfo;
  success: boolean;
}

export interface BizGroupInfo {
  code: string;
  description: string;
  support: boolean;
}

export interface ProductInfo {
  attributes: ProductInfoAttribute[];
  bizType: number;
  categoryID: number;
  categoryName: string;
  createTime: string;
  crossBorderOffer: boolean;
  description: string;
  extendInfos: ExtendInfo[];
  groupID: number[];
  image: Image;
  language: string;
  lastUpdateTime: string;
  mainVedio: string;
  periodOfValidity: number;
  pictureAuth: boolean;
  productID: number;
  productType: string;
  qualityLevel: number;
  referencePrice: string;
  saleInfo: SaleInfo;
  sellStartTime: string;
  sevenDaysRefunds: boolean;
  shippingInfo: ShippingInfo;
  skuInfos: SkuInfo[];
  status: string;
  subject: string;
  supplierLoginId: string;
  supplierUserId: string;
}

export interface ProductInfoAttribute {
  attributeID: number;
  attributeName: string;
  isCustom: boolean;
  value: string;
}

export interface ExtendInfo {
  key: string;
  value: string;
}

export interface Image {
  images: string[];
}

export interface SaleInfo {
  amountOnSale: number;
  minOrderQuantity: number;
  mixWholeSale: boolean;
  priceAuth: boolean;
  priceRanges: PriceRange[];
  quoteType: number;
  saleType: string;
  supportOnlineTrade: boolean;
  unit: string;
}

export interface PriceRange {
  price: number;
  startQuantity: number;
}

export interface ShippingInfo {
  freightTemplateID: number;
  sendGoodsAddressId: number;
  sendGoodsAddressText: string;
}

export interface SkuInfo {
  amountOnSale: number;
  attributes: SkuInfoAttribute[];
  cargoNumber: string;
  consignPrice: number;
  price: number;
  skuCode: string;
  skuId: number;
  specId: string;
}

export interface SkuInfoAttribute {
  attributeDisplayName: AttributeDisplayName;
  attributeID: number;
  attributeValue: string;
  skuImageUrl?: string;
}

export enum AttributeDisplayName {
  规格 = "规格",
  规格型号 = "规格型号",
  颜色 = "颜色",
}
