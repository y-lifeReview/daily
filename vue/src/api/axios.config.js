import Axios from "axios";

// const baseIp = 'http://127.0.0.1:3000/v1';
const baseIp = 'https://www.c-sandm.top/v1/';

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
        return Promise.reject({
            code: 500,
            msg: "服务器异常，请稍后重试…"
        });
    }
);

export default service;
