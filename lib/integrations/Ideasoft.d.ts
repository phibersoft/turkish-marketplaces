import { AxiosInstance } from "axios";
import { I_Integrations_Class, I_Integrations_Ideasoft_ApiRequest_Orders_Params, I_Integrations_Ideasoft_ApiRequest_Products_Params, I_Integrations_Ideasoft_Image, I_Integrations_Ideasoft_Order, I_Integrations_Ideasoft_Product, I_Integrations_MainResponse } from "../types";
export declare class Ideasoft implements I_Integrations_Class<I_Integrations_Ideasoft_Product, I_Integrations_Ideasoft_Product[], I_Integrations_Ideasoft_ApiRequest_Products_Params, Omit<I_Integrations_Ideasoft_ApiRequest_Products_Params, "page" | "limit">, I_Integrations_Ideasoft_Order, I_Integrations_Ideasoft_Order[], I_Integrations_Ideasoft_ApiRequest_Orders_Params, Omit<I_Integrations_Ideasoft_ApiRequest_Orders_Params, "page" | "limit">> {
    api: AxiosInstance;
    constructor(apiKey: string, magazaUri: string);
    getProducts: (params?: Partial<I_Integrations_Ideasoft_ApiRequest_Products_Params>) => Promise<I_Integrations_MainResponse<I_Integrations_Ideasoft_Product[]>>;
    getProductsBulk: (params?: Partial<Omit<I_Integrations_Ideasoft_ApiRequest_Products_Params, "page" | "limit">>, middleware?: ((currentPage: number) => void) | undefined) => Promise<I_Integrations_MainResponse<I_Integrations_Ideasoft_Product[]>>;
    /**
     * @helper Date types as 'YYYY-MM-DD HH:MM:SS'
     */
    getOrders: (params?: Partial<I_Integrations_Ideasoft_ApiRequest_Orders_Params>) => Promise<I_Integrations_MainResponse<I_Integrations_Ideasoft_Order[]>>;
    getOrdersBulk: (params?: Partial<Omit<I_Integrations_Ideasoft_ApiRequest_Orders_Params, "page" | "limit">>, middleware?: ((currentPage: number) => void) | undefined) => Promise<I_Integrations_MainResponse<I_Integrations_Ideasoft_Order[]>>;
    editProduct: (product: Partial<I_Integrations_Ideasoft_Product>, productId: number) => Promise<I_Integrations_MainResponse<I_Integrations_Ideasoft_Product>>;
    editOrder: (order: Partial<I_Integrations_Ideasoft_Order>, orderId: number) => Promise<I_Integrations_MainResponse<I_Integrations_Ideasoft_Order>>;
    imageConverter: (image: I_Integrations_Ideasoft_Image) => string;
    timeFormatter: (date: Date) => string;
}
