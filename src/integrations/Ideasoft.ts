import axios, { AxiosInstance } from "axios";
import {
  I_Integrations_Class,
  I_Integrations_Ideasoft_ApiRequest_Orders_Params,
  I_Integrations_Ideasoft_ApiRequest_Products_Params,
  I_Integrations_Ideasoft_Image,
  I_Integrations_Ideasoft_Order,
  I_Integrations_Ideasoft_Product,
  I_Integrations_MainResponse,
} from "../types";
import { IntegrationHelpers } from "../helpers.service";

export class Ideasoft
  implements
    I_Integrations_Class<
      I_Integrations_Ideasoft_Product,
      I_Integrations_Ideasoft_Product[],
      I_Integrations_Ideasoft_ApiRequest_Products_Params,
      Omit<
        I_Integrations_Ideasoft_ApiRequest_Products_Params,
        "page" | "limit"
      >,
      I_Integrations_Ideasoft_Order,
      I_Integrations_Ideasoft_Order[],
      I_Integrations_Ideasoft_ApiRequest_Orders_Params,
      Omit<I_Integrations_Ideasoft_ApiRequest_Orders_Params, "page" | "limit">
    >
{
  public api: AxiosInstance;

  constructor(apiKey: string, magazaUri: string) {
    this.api = axios.create({
      baseURL: `${magazaUri}/api`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  public getProducts = async (
    params: Partial<I_Integrations_Ideasoft_ApiRequest_Products_Params> = {}
  ): Promise<
    I_Integrations_MainResponse<I_Integrations_Ideasoft_Product[]>
  > => {
    const _params: typeof params = {
      ...params,
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 100,
    };

    return IntegrationHelpers.wrapper<I_Integrations_Ideasoft_Product[]>(() =>
      this.api.get(`/products?${IntegrationHelpers.objectToQuery(_params)}`)
    );
  };

  public getProductsBulk = async (
    params: Partial<
      Omit<I_Integrations_Ideasoft_ApiRequest_Products_Params, "page" | "limit">
    > = {},
    middleware?: (currentPage: number) => void
  ): Promise<
    I_Integrations_MainResponse<I_Integrations_Ideasoft_Product[]>
  > => {
    const firstResults = await this.getProducts({
      ...params,
      page: 1,
    });

    if (firstResults.success === true) {
      const products: I_Integrations_Ideasoft_Product[] = [
        ...firstResults.data,
      ];

      let i = 2;

      while (true) {
        try {
          middleware?.(i);
          await IntegrationHelpers.sleeper(250);
          const nextResults = await this.getProducts({
            ...params,
            page: i,
          });

          if (nextResults.success === true) {
            if (nextResults.data.length === 0) {
              break;
            }
            products.push(...nextResults.data);
          } else {
            throw new Error(`Loop Error: ${nextResults.message}`);
          }
          i++;
        } catch (e: any) {
          return {
            success: false,
            message: e.message,
          };
        }
      }

      return {
        success: true,
        data: IntegrationHelpers.uniquer<I_Integrations_Ideasoft_Product>(
          products,
          "id"
        ),
      };
    } else {
      return firstResults;
    }
  };
  /**
   * @helper Date types as 'YYYY-MM-DD HH:MM:SS'
   */
  public getOrders = async (
    params: Partial<I_Integrations_Ideasoft_ApiRequest_Orders_Params> = {}
  ): Promise<I_Integrations_MainResponse<I_Integrations_Ideasoft_Order[]>> => {
    const _params: typeof params = {
      ...params,
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 100,
    };

    return IntegrationHelpers.wrapper<I_Integrations_Ideasoft_Order[]>(() =>
      this.api.get(`/orders?${IntegrationHelpers.objectToQuery(_params)}`)
    );
  };

  public getOrdersBulk = async (
    params: Partial<
      Omit<I_Integrations_Ideasoft_ApiRequest_Orders_Params, "page" | "limit">
    > = {},
    middleware?: (currentPage: number) => void
  ): Promise<I_Integrations_MainResponse<I_Integrations_Ideasoft_Order[]>> => {
    const today = new Date();
    const _endDate = this.timeFormatter(today);
    today.setDate(today.getDate() - 1);
    const _startDate = this.timeFormatter(today);
    const defParams: Partial<I_Integrations_Ideasoft_ApiRequest_Orders_Params> =
      {
        ...params,
        startDate: params.startDate || _startDate,
        endDate: params.endDate || _endDate,
        page: 1,
        limit: 100,
      };

    const firstResults = await this.getOrders(defParams);

    if (firstResults.success === true) {
      const orders: I_Integrations_Ideasoft_Order[] = [...firstResults.data];

      let i = 2;

      while (true) {
        try {
          middleware?.(i);
          await IntegrationHelpers.sleeper(250);
          const nextResults = await this.getOrders({
            ...defParams,
            page: i,
          });

          if (nextResults.success === true) {
            if (nextResults.data.length === 0) {
              break;
            }
            orders.push(...nextResults.data);
          } else {
            throw new Error(`Loop Error: ${nextResults.message}`);
          }
          i++;
        } catch (e: any) {
          return {
            success: false,
            message: e.message,
          };
        }
      }

      return {
        success: true,
        data: orders,
      };
    } else {
      return firstResults;
    }
  };

  public editProduct = async (
    product: Partial<I_Integrations_Ideasoft_Product>,
    productId: number
  ): Promise<I_Integrations_MainResponse<I_Integrations_Ideasoft_Product>> => {
    return IntegrationHelpers.wrapper<I_Integrations_Ideasoft_Product>(() =>
      this.api.put(`/products/${productId}`, product)
    );
  };

  public editOrder = async (
      order: Partial<I_Integrations_Ideasoft_Order>,
      orderId: number
  ): Promise<I_Integrations_MainResponse<I_Integrations_Ideasoft_Order>> => {
    return IntegrationHelpers.wrapper<I_Integrations_Ideasoft_Order>(
        () => this.api.put(`/orders/${orderId}`, order)
    )
  }

  public imageConverter = (image: I_Integrations_Ideasoft_Image): string => {
    const { directoryName, filename, extension, revision } = image;
    return `https://st3.myideasoft.com/idea/cv/99/myassets/products/${directoryName}/${filename}.${extension}?revision=${revision}`;
  };

  public timeFormatter = (date: Date): string => {
    // return string as "YYYY-MM-DD HH:mm:ss"
    let year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();
    let hour: any = date.getHours();
    let minute: any = date.getMinutes();
    let second: any = date.getSeconds();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };
}
