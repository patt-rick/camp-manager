import axios from "axios";
import { API_SERVICE } from "./constants";

type ApiRequestResult<TData = any, SData = any> = {
    error?: boolean | string | null;
    success?: boolean;
    data?: TData;
    metadata?: SData;
    status?: number | null;
    message?: string;
    errorData?: any;
    count?: number;
    headers?: any;
};
export async function apiPost<T, S>(url: string, data?: any): Promise<ApiRequestResult<T, S>> {
    try {
        const axiosSecure = getSecureAxiosInstance();
        const response: any = await axiosSecure.post(url, data);

        return {
            data: response.data.data,
            metadata: response.data.metadata,
            headers: response.headers || {},
        };
    } catch (err) {
        throw err as any;
    }
}

export async function apiGet<T, S>(url: string): Promise<ApiRequestResult<T, S>> {
    try {
        const axiosSecure = getSecureAxiosInstance();
        const response: any = await axiosSecure.get(url);
        return response.data.data;
    } catch (err) {
        throw err as any;
    }
}

export async function apiPut<T, S>(url: string, data?: any): Promise<ApiRequestResult<T, S>> {
    try {
        const axiosSecure = getSecureAxiosInstance();
        const response: any = await axiosSecure.put(url, data);

        return {
            data: response.data.data,
            metadata: response.data.metadata,
            headers: response.headers || {},
        };
    } catch (err) {
        throw err as any;
    }
}

export function getSecureAxiosInstance(): any {
    function instance(token: string) {
        return axios.create({
            baseURL: API_SERVICE,
            headers: { Authorization: `Bearer ${token}` },
        });
    }
    const currentUser = getCurrentlyLoggedInUser();
    if (currentUser) {
        return instance(currentUser.authToken);
    }
    throw new Error("Attempting to securely connect to api when there is no active user!");
}

export function getCurrentlyLoggedInUser(): any | null {
    const userData = sessionStorage.getItem("USER_TOKEN");
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
}
