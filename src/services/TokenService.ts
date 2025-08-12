export const getAccessToken = (): string | null => localStorage.getItem("accessToken");
export const getRefreshToken = (): string | null => localStorage.getItem("refreshToken");

export const setAccessToken = (token: string): void => {
    localStorage.setItem("accessToken", token);
};

export const setRefreshToken = (token: string): void => {
    localStorage.setItem("refreshToken", token);
};