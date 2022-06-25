import { AxiosResponse } from "axios";
import { I_Integrations_MainResponse } from "./types";

export const IntegrationHelpers = {
  wrapper: async <DataType = any>(
    func: () => Promise<AxiosResponse<DataType>>
  ): Promise<I_Integrations_MainResponse<DataType>> => {
    try {
      const results = await func();
      return {
        success: true,
        data: results.data,
      };
    } catch (e: any) {
      let _msg = e.message;
      if (e?.response?.data) {
        _msg = JSON.stringify(e.response.data);
      }

      return {
        success: false,
        message: _msg,
      };
    }
  },

  objectToQuery: (obj: Object) => {
    return Object.keys(obj)
      .map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
      })
      .join("&");
  },

  uniquer: <T = any>(data: T[], key: keyof T): T[] => {
    var wR: T[];

    const usedKeys = data.map((it) => it[key]);
    const uniqueKeys = [...new Set(usedKeys)];

    wR = uniqueKeys.map((uQ) => {
      const founds = data.filter((d) => d[key] === uQ);

      return founds[0];
    });

    return wR;
  },

  sleeper: async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms)),

  basicAuth: (username: string, password: string) => {
    const tok = Buffer.from(`${username}:${password}`).toString("base64");
    return `Basic ${tok}`;
  },
};
