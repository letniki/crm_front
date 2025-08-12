import axios, {AxiosResponse} from "axios";
import {getRefreshToken, setAccessToken, setRefreshToken} from "./TokenService";
import { IAuthRequest } from "../interfaces/auth/IAuthRequest";
import { IAuthResponse } from "../interfaces/auth/IAuthResponse";
import { BASE_URL } from "./consts";


export const login = async (authData: IAuthRequest): Promise<IAuthResponse> => {
    try {
        const response: AxiosResponse<IAuthResponse> = await axios.post(
            `${BASE_URL}/auth/login`,
            authData,
            {headers: {
                "Content-Type": "application/json"
                }}
        )
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        return response.data;
    } catch (error){
        console.error(error);
        throw new Error("Auth failed");
    }
}

export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        console.log("Stored refresh token:", getRefreshToken());
        const refreshToken = getRefreshToken();
        const response: AxiosResponse<IAuthResponse> = await axios.post(
            `${BASE_URL}/auth/refresh-token`,
            {refreshToken},
            {headers: {"Content-Type": "application/json"}}
        );
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);

        return response.data.accessToken;
    } catch (error) {
        console.error("Error refresh token:", error);
        return null;
    }
};