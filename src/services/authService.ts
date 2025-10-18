import axios, {AxiosResponse} from "axios";
import {getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, setUserName, setUserRole} from "./tokenService";
import {IAuthRequest} from "../interfaces/auth/IAuthRequest";
import {IAuthResponse} from "../interfaces/auth/IAuthResponse";
import {BASE_URL} from "./consts";
import { IPasswordUpdate } from "../interfaces/auth/IPasswordUpdate";


export const login = async (authData: IAuthRequest): Promise<void> => {
    try {
        const response: AxiosResponse<IAuthResponse> = await axios.post(
            `${BASE_URL}/auth/login`,
            authData,
            {headers: {
                "Content-Type": "application/json"
                }}
        )
        console.log(response.data);
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setUserName(response.data.name);
        setUserRole(response.data.role);
    } catch (error){
        console.error(error);
        throw error;
    }
}

export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        console.error("No refresh token");
        return null;
    }

    try {
        console.log("Stored refresh token:", getRefreshToken());

        const response: AxiosResponse<IAuthResponse> = await axios.post(
            `${BASE_URL}/auth/refresh-token`,
            {refreshToken},
            {headers: {"Content-Type": "application/json"}}
        );
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        return response.data.accessToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};

export const requestPasswordToken = async (managerId: number): Promise<string> => {
    try {
        const response: AxiosResponse<string> = await axios.post(
            `${BASE_URL}/auth/setPassword/id/${managerId}`,
            {headers: {Authorization: `Bearer ${getAccessToken()}`}}
        );
        return response.data;
    } catch (error) {
        console.error("Error activating manager", error)
        throw error;
    }
}

export const setManagerPassword = async (token: string, request: IPasswordUpdate): Promise<void> => {
    try {
        await axios.post(
            `${BASE_URL}/auth/setPassword/${token}`,
            request,
            {headers: {"Content-Type": "application/json"}}
        );
    } catch (error) {
        console.error("Error activating manager", error)
        throw error;
    }
}