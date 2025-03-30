import axios from "axios"
import { ElMessage } from 'element-plus'
import config from "@/config"

const service = axios.create({
    // baseURL: config.baseApi
});
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        console.log("拦截response.use方法",response);
        const res = response.data;
        if (res.code !== 200) {
            ElMessage({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res.data;
        }
    }
);

function request(options) {
    console.log("request options 入口");

    options.mehthod = options.method || 'get';
    // if (options.mehthod.toLowerCase() === 'get') {
    //     options.params = options.data || {};
    // } else {
    //     options.data = options.data || {};
    // }
    // let isMock = config.mock;
    // if (options.mock !== undefined) {
    //     //优先使用接口配置的mock值
    //     isMock = options.mock;
    // }
    // if (config.env === 'prod') {
    //     //生产环境不使用mock
    //     isMock = false;
    // }
    return service(options)
}

export default request;