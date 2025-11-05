import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from './Endpoints';
import { refreshTokenService } from './Auth';
import { get, saveString } from '../utils/storage';
import { logToConsole } from '../utils/functions';

// export const BASE_URL = 'http://localhost:4000/api/';
export const BASE_URL = 'http://13.235.83.139:3001/api/';
export const ASSET_URL = "https://d3f1l8wc4pf29x.cloudfront.net/";

const publicReq = axios.create({
    baseURL: BASE_URL,
    timeout: 20000, // 10 seconds
});

const instance = axios.create({
    baseURL: BASE_URL,
});

const fileInstance = axios.create({
    baseURL: BASE_URL,
});
interface RetryQueueItem {
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
    config: AxiosRequestConfig;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

const onRefresh = async () => {
    try {
        const token = await get(REFRESH_TOKEN_KEY);
        if (token) {
            const res = await refreshTokenService({
                'Authorization': `Bearer ${token}`
            });
            if (res?.data?.status) {
                saveString(TOKEN_KEY, res?.data.data.token);
                if (res?.data.data.refreshToken)
                    saveString(REFRESH_TOKEN_KEY, res?.data.data.refreshToken);
                return { token: res?.data.data.token };
            }
        } else {
            return Promise.reject({ message: 'Token not present', status: false });
        }
    } catch (e) {
        AsyncStorage.removeItem(TOKEN_KEY);
        AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
        // eventEmitter.emit('logout');
        logToConsole(e);
    }
};

instance.interceptors.request.use(async config => {

    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

    if (config.headers != null) {
        if (config.url == 'auth/logout') {
            config.headers['Authorization'] = `Bearer ${refreshToken}`;
        }
        else {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const connectionState = await NetInfo.fetch();
    if (
        !connectionState.isConnected ||
        (connectionState.isInternetReachable !== null &&
            !connectionState.isInternetReachable)
    ) {
        const controller = new AbortController();
        const cfg = {
            ...config,
            signal: controller.signal,
        };
        // showNointernetToast();
        controller.abort();
        return cfg;
    }
    return config;
});

const onErrorResponse = async (error: any) => {
    const originalRequest = error.response?.config;
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status === 401) {
        if (!isRefreshing) {
            isRefreshing = true;

            originalRequest._retry = true;
            try {
                const res = await onRefresh();
                if (res?.token) {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res?.token;
                    fileInstance.defaults.headers['Authorization'] = `Bearer ${res?.token}`;

                    instance.defaults.headers['Authorization'] = `Bearer ${res?.token}`;
                    refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
                        instance
                            .request(config)
                            .then((response) => resolve(response))
                            .catch((err) => reject(err));
                    });

                    // Clear the queue
                    refreshAndRetryQueue.length = 0;

                    // Retry the original request
                    return instance(originalRequest);
                } else {
                    await AsyncStorage.removeItem(TOKEN_KEY);
                    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
                    return Promise.reject(error);
                }
            } catch (error) {
                // isRefreshing = false;
            } finally {
                isRefreshing = false;
            }
            // return Promise.reject(error);
        }
        // Add the original request to the queue
        return new Promise<void>((resolve, reject) => {
            refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
        });

    }
    return Promise.reject(error);
};

instance.interceptors.response.use(async function (response) {
    // if(__DEV__){
    //     logToConsole('api_', response.request?.responseURL, response )
    // }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, onErrorResponse);

fileInstance.interceptors.response.use(async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, onErrorResponse);

fileInstance.interceptors.request.use(async config => {
    const token = await get(TOKEN_KEY);

    if (config.headers != null) {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

export { instance, fileInstance, publicReq };