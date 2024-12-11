// HttpService.ts
import client from "./axiosClient"; // همان کلاینتی که در کامپوننت URL Handler ایجاد شد
import { ApiErrorManager } from "./apiError/ApiErrorManager"; // کامپوننت مدیریت خطاها

// ساختار ثابت برای موفقیت و خطاها
export interface ApiResponse {
    status: number;
    data: any;
    message: string;
}

export interface ExceptionResult {
    status: number;
    data: any;
    error?: any;
    message?: string;
}

// GET
export const GET = async (url: string, params?: any):Promise<any> => {
    try {
        const response = await client.get(url, { params });
        return {
            status: response.status,
            data: response.data,
            message: response.data?.message || "Success"
        };
    } catch (error:any) {
        return ApiErrorManager(error);
    }
};

// POST
export const POST = async (url: string, data?: any):Promise<ApiResponse | any> => {
    try {
        const response = await client.post(url, data);
        return {
            status: response.status,
            data: response.data,
            message: response.data?.message || "Success"
        };
    } catch (error:any) {
        return ApiErrorManager(error);
    }
};

// PUT
export const PUT = async (url: string, data?: any):Promise<any> => {
    try {
        const response = await client.put(url, data);
        return {
            status: response.status,
            data: response.data,
            message: response.data?.message || "Success"
        };
    } catch (error:any) {
        return ApiErrorManager(error);
    }
};

// DELETE
export const DELETE = async (url: string):Promise<any> => {
    try {
        const response = await client.delete(url);
        return {
            status: response.status,
            data: response.data,
            message: response.data?.message || "Success"
        };
    } catch (error:any) {
        return ApiErrorManager(error);
    }
};
