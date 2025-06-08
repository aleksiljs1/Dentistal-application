import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios, { type AxiosResponse, type AxiosRequestHeaders } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

interface ApiResponse {
    message?: string;
    error?: string;
}

// Create axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        // If token exists, add it to headers
        if (token) {
            if (!config.headers) {
                config.headers = {} as AxiosRequestHeaders;
            }
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle request error
        toast.error('Request failed. Please try again.');
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        // Handle successful responses
        if (response.data?.message) {
            toast.success(response.data.message);
        }
        return response;
    },
    (error) => {
        // Handle response errors
        if (error.response?.status === 401) {
            // Clear token and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
            toast.error('Session expired. Please login again.');
        } else if (error.response?.status === 403) {
            window.location.href = '/dashboard';
            toast.error('Access denied. Insufficient permissions.');
        } else {
            // Handle other errors
            const message = error.response?.data?.error || 'An error occurred. Please try again.';
            toast.error(message);
        }
        return Promise.reject(error);
    }
);

// Export instance and common API methods
export const api = {
    get: <T>(url: string) => axiosInstance.get<T & ApiResponse>(url),
    post: <T>(url: string, data: any) => axiosInstance.post<T & ApiResponse>(url, data),
    put: <T>(url: string, data: any) => axiosInstance.put<T & ApiResponse>(url, data),
    patch: <T>(url: string, data: any) => axiosInstance.patch<T & ApiResponse>(url, data),
    delete: <T>(url: string) => axiosInstance.delete<T & ApiResponse>(url),
};

export default axiosInstance; 