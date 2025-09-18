import axios, { AxiosResponse } from "axios";
import { IManager } from "../interfaces/manager/IManager";
import { IPaginationResponse } from "../interfaces/order/IPaginationResponse";
import { BASE_URL } from "./consts";
import { getAccessToken } from "./TokenService";
import { ICreateManagerFormData } from "../interfaces/order/ICreateManagerFormData";

export const getManagers = async (): Promise<IPaginationResponse<IManager>> => {
    try {
        const response: AxiosResponse<IPaginationResponse<IManager>> = await axios.get(`${BASE_URL}/managers?page=1`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching managers", error);
        throw error;
    }
};


export const addManager = async (data: ICreateManagerFormData): Promise<void> => {
    try {
        const response: AxiosResponse<void> = await axios.post(
            `${BASE_URL}/managers/create`,
            data,
            {headers: {Authorization: `Bearer ${getAccessToken()}`}}
        );
        return response.data;
    } catch (error) {
        console.error("Error creating manager", error);
        throw error;
    }
};