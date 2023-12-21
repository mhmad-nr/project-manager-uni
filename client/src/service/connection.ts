import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { useLocalStorage } from "../hook";
import { store } from "../redux";
import { errorAxiosType } from "../types";
import { toastFun } from "../util";



const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = store.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type']

    return config;
}

const onResponse = (response: AxiosResponse) => {
    const { data } = response
    return response;
}

const onResponseError = (error: AxiosError<errorAxiosType>): Promise<AxiosError> => {
    console.log(error);
    const data = error.response?.data


    if (data) {
        if (Array.isArray(data.message)) {
            data.message.map((msg) => toastFun(msg))
        } else {
            toastFun(data.message)
        }
    }

    if (error.response?.data.statusCode) {
        window.location.replace('/add-contact-info')
    }


    return Promise.reject(error.response?.data);
}

axios.interceptors.request.use(onRequest);

axios.interceptors.response.use(onResponse, onResponseError);



function get<T>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<T>> {
    return new Promise((success, fail) => {
        axios.get(url, config).then(result => {
            if (result.status == 200)
                success(result)
            else {
                fail(result);
            }
        }).catch(result => {
            fail(result);
        })
    });
}

function post<T, P>(url: string, data: T, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<P>> {
    return new Promise((success, fail) => {
        axios.post(url, data, config)
            .then(result => {
                success(result)
            }).catch(result => {
                fail(result);
            })
    });
};

function patch<T, P>(url: string, data: T, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<P>> {
    return new Promise((success, fail) => {
        axios.patch(url, data, config)
            .then(result => {
                success(result)
            }).catch(result => {
                fail(result);
            })
    });
};

function deleteReq<T>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<T>> {
    return new Promise((success, fail) => {
        axios.delete(url, config)
            .then(result => {
                success(result)
            }).catch(result => {
                fail(result);
            })
    });
};

export {
    get as get,
    post as post,
    patch as patch,
    deleteReq as delete,
};