import axios, { AxiosInstance } from "axios";

console.log('import.meta.env :>> ', import.meta.env);
// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? 'http://192.168.0.50:9996' : `http://${location.host}:9996`,
  timeout: 120000,
  // paramsSerializer: function (params) {
  //   return Qs.stringify(params, { arrayFormat: "brackets" });
  // },
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    return Promise.resolve(response.data);
  },
  error => {
    // 响应错误处理
    return Promise.reject(error.response);
  }
);

export default service;
