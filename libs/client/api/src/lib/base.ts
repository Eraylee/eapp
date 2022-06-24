import axios from 'axios';
import { message } from 'antd';

export interface Result<T> {
  code: number;
  message: string;
  data: T;
}

export enum OrderTypes {
  DESC,
  ASC,
}

export interface PaginationOptions {
  pageNum: number;
  pageSize: number;
  orderColumn: string;
  orderType: OrderTypes;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  pageNum: number;
  pageSize: number;
  maxPage: number;
}

// let BASE_API = '';

// if (process.env['NODE_ENV'] !== 'development') {
//   BASE_API = process.env.REACT_APP_API as string;
// }

/**
 * 设置默认Content-Type
 */
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.baseURL = BASE_API;
axios.defaults.baseURL = 'api';

/**
 * request拦截器
 */
axios.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem('TOKEN');
    if (TOKEN) {
      config.headers && (config.headers['Authorization'] = `Bearer ${TOKEN}`);
    } else {
      config.headers && delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  }
);
/**
 * response拦截器
 */
axios.interceptors.response.use(
  async (res) => {
    return res?.data?.data;
  },
  async (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('TOKEN');
      message.error(err?.response?.data?.message ?? '请重新登录');
      window.location.reload();
    }
    return Promise.reject(err?.response?.data ?? err);
  }
);

/**
 * 封装get方法
 * @param url
 * @param params
 */
export const GET = async <P extends { [key: string]: any }, R>(
  url: string,
  params?: P
): Promise<R> => {
  return await axios.get<P, R>(url, { params });
};
/**
 * 封装post请求
 * @param url
 * @param data
 */
export const POST = async <P extends { [key: string]: any }, R>(
  url: string,
  data?: P
): Promise<R> => {
  return await axios.post<P, R>(url, data);
};
