import { AxiosResponse } from "axios";
import { I_Integrations_MainResponse } from "./types";
export declare const IntegrationHelpers: {
    wrapper: <DataType = any>(func: () => Promise<AxiosResponse<DataType, any>>) => Promise<I_Integrations_MainResponse<DataType>>;
    objectToQuery: (obj: Object) => string;
    uniquer: <T = any>(data: T[], key: keyof T) => T[];
    sleeper: (ms: number) => Promise<unknown>;
    basicAuth: (username: string, password: string) => string;
};
