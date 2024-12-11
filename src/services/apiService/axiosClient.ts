import axios from "axios";
import { fetchAccessToken } from "./JwtService";

const accessToken = fetchAccessToken();

// Base URL for the API
export const BasicUrl = {
    baseURL: "https://api.dite.app/api/v1",
};

export const BasicUserUrl = {
    baseURL: "https://web.dite.app",
};

// Create an Axios client instance
const client = axios.create({
    baseURL: BasicUrl.baseURL,
    headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined
      },
});

// Create an Axios client instance
export const  clientNotToken= axios.create({
    baseURL: BasicUrl.baseURL
});


// Request interceptor to add the access token to every request
client.interceptors.request.use(
    (config) => {
        const accessToken = fetchAccessToken(); // Fetch the access token from a helper function
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Add token to headers if it exists
        } 
        return config; // Return the modified config
    },
    (error) => {
        return Promise.reject(error); // Reject the promise if there's an error in request
    }
);

export default client; // Export the configured Axios client
