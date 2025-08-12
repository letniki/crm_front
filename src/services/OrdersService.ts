import axios, { AxiosResponse } from "axios";
import { refreshAccessToken } from "./authService";
import { getAccessToken } from "./TokenService";
import { IOrdersPaginated } from "../interfaces/order/IOrdersPaginated";
import { BASE_URL } from "./consts";


axios.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export const getAllOrders = async (page: number, order: string, direction: string): Promise<IOrdersPaginated> => {
    try {
        const response: AxiosResponse<IOrdersPaginated> = await axios.get(`${BASE_URL}/orders`, {
            params: {page, order, direction}
        });
        return response.data;
    } catch (error) {
        console.error("Failed to get orders", error);
        throw error;
    }
};