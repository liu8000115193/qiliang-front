import axios, { AxiosInstance } from "axios";
import {showNotify } from 'vant';

console.log('import.meta.env :>> ', import.meta.env);
// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? 'http://192.168.0.150:9996' : `http://${location.host}:9996`,
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
    if (response.data == '') {
      return;
    }
    console.log('response.data :>> ', response.data);
    if (response.data.code !== 0) {
      showNotify({
        type: 'danger',
        message: response.data.msg
      })
      return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
  },
  error => {
    // 响应错误处理
    return Promise.reject(error.response);
  }
);

export default service;
