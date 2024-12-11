import { toast } from 'react-toastify';

interface ErrorResponse {
    response?: {
        status: number;
        data?: {
            message?: string;
            [key: string]: any;
        };
    };
}

interface ExceptionResult {
    status: number;
    error?: any;
    message: string;
}

let isNetworkErrorShown = false; // متغیر خارجی برای پیگیری خطاهای اتصال

export const ApiErrorManager = (error: ErrorResponse): ExceptionResult => {
    let message: string;

    if (error.response) {
        switch (error.response.status) {
            case 400:
                message = error.response.data?.message || "Bad Request";
                toast.error(message);
                break;
            case 401:
                window.location.href = '/login';
                message = "Unauthorized Access";
                toast.error(message);
                break;
            case 403:
                message = "Access Denied";
                toast.error(message);
                window.location.href = '/';
                break;
            case 500:
                message = "Server Error";
                toast.error(message);
                break;
            default:
                message = error.response.data?.message || "Unexpected Error";
                toast.error(message);
                break;
        }
    } else {
        // اگر مشکل اینترنت یا اتصال به سرور وجود دارد
        message = "Network Error. Please check your connection.";
        
        if (!isNetworkErrorShown) {
            toast.error(message);
            isNetworkErrorShown = true; // جلوگیری از نمایش چند باره خطا
            setTimeout(() => {
                isNetworkErrorShown = false; // بعد از چند ثانیه دوباره اجازه نمایش خطا را بده
            }, 5000); // تنظیم زمان دلخواه
        }
    }

    return {
        status: error.response?.status || 0,
        error: error.response?.data || null,
        message
    };
};
