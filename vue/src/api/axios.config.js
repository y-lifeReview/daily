import Axios from "axios";


const baseIp = process.env.VUE_APP_BASE_API;

export const CONTENT_TYPE = "Content-Type";
export const APPLICATION_JSON = "application/json; charset=UTF-8";

const service = Axios.create({
    baseURL: baseIp,
    timeout: 10 * 60 * 1000,
});

service.interceptors.request.use(
    (config) => {
        !config.headers && (config.headers = {});
        if (!config.headers[CONTENT_TYPE]) {
            config.headers[CONTENT_TYPE] = APPLICATION_JSON;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error.response);
    }
)

service.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response;
        } else {
            throw new Error(response.status.toString());
        }
    },
    (error) => {
        if (process.env.NODE_ENV === "development") {
            console.log(error);
        }
        console.log('请求错误',error)
        return Promise.reject({
            code: 500,
            msg: error.message
        });
    }
);

export default service;
