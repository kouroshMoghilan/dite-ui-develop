import {jwtDecode} from "jwt-decode";


interface JwtPayload {
    ParentDomainToken?: string;
}


// Saves access token to localStorage
export const saveAccessToken = (accessToken: string): void => {
    localStorage.setItem("accessToken", accessToken);
};

// Saves refresh token to localStorage
export const saveRefreshToken = (refreshToken: string): void => {
    localStorage.setItem("refreshToken", refreshToken);
};

// Retrieves refresh token from localStorage
export const fetchRefreshToken = (): string | undefined => {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken || undefined;
};

// Retrieves access token from localStorage
export const fetchAccessToken = (): string | undefined => {
    const token = localStorage.getItem("accessToken");
    return token || undefined;
};

// Removes access token from localStorage for logout
export const RemoveAccessToken = (): void => {
    localStorage.removeItem("accessToken");
};

// Decodes the access token to access its properties
export const decodeAccessToken = (): any | undefined => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return undefined;
    return jwtDecode(accessToken);
};

// Checks if the user is still authenticated based on token expiration time
export const IsAuthenticated = (): boolean => {
    const accessToken: any = decodeAccessToken();
    if (!accessToken) return false;
    const date = Math.ceil(new Date().getTime() / 1000);
    return accessToken.exp >= date;
};


// Retrieves a specific property from the access token by name
export const GetSpecialProperty = (propName: string): any => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            window.location.href = "/";
            return undefined;
        }

        // Decode token and ensure it's a generic record
        const jwtPayload = jwtDecode<Record<string, any>>(token);

        // Check if the property exists and return it
        return jwtPayload && jwtPayload.hasOwnProperty(propName) ? jwtPayload[propName] : undefined;
    } catch (e) {
        window.location.href = "/";
        return undefined;
    }
};


// Retrieves the authenticated user's ID from the decoded token
export const GetAuthenticatedUser = (): string | undefined => {
    try {
        const token: any = decodeAccessToken();
        const userId = token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        if (!userId) {
            window.location.href = "/";
            return;
        }
        return userId;
    } catch (e) {
        window.location.href = "/";
    }
};

// Retrieves the ParentDomainToken from the decoded token
export const GetParentDomainToken = (): string | undefined => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            window.location.href = "/";
            return undefined;
        }
        const jwt = jwtDecode<JwtPayload>(token);
        return jwt.ParentDomainToken;
    } catch (e) {
        window.location.href = "/";
        return undefined;
    }
};