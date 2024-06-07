
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from "axios";
import { message  } from 'antd';
const BASE_URL = "http://123.207.197.182:3000/api/"
const instance = axios.create({
    baseURL: BASE_URL, // 基础URL，后面的请求会拼接到这个URL上
    timeout: 5000, // 请求超时时间
    // 可以在这里添加其他公共选项，如headers等
});
// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        // 例如，添加token到请求头
        // if (localStorage.getItem('token')) {
        //   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        // }
        // withCredentials

        config.withCredentials = true;
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        // 例如，返回的数据可能包含code、message、data等字段，你可能需要只返回data字段
        // console.log(response.data)
        // if(response.data.code!== 200){
        //   message.error(response.data.message)
        // }
        //
        //   const { mes, type } = handleResponseError(response.data);
        if(typeof window !== 'undefined'){
            console.log('客戶端')
            message.info(response.data.message)
        }else {
            console.log(response.data.message)
        }
        // console.log(typeof window, '=================080', typeof window !== 'undefined'  ,message)
        //   console.log(JSON.stringify(message), "message");
        // message.open({ content: mes, type });
        return response;
    },
    (error: AxiosError) => {
        // 对响应错误做点什么
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.log(error.request);
        } else {
            // 发送请求时发生了某些错误
            console.log("Error", error.message);
        }
        return Promise.reject(error);
    }
);
export const get = async (url: string) => {
    const response = await fetch(url);
    return response.json();
};
export const post = async (url: string, data: any) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
};
export const getArticleList = async () => {
    const response = await instance.get('article', {
        headers: { "cache-control": "no-cache" },
    });
    return response.data.data;
};
export const LoginApi = async () => {
    return await instance.post("login", {
        user_name: "朝阳",
        pass_word: "1234567",
        headers: { "cache-control": "no-cache" },
    });
};