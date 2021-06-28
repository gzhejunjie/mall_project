import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',  已废弃的地址
    baseURL: 'http://152.136.185.210:7878/api/m5',  //最新地址
    timeout: 5000
  })

  //请求拦截
  instance.interceptors.request.use(data => {
    // console.log(data);
    return data;
  }, err => {
    console.log(err);
  })

  //响应拦截
  instance.interceptors.response.use(result => {
    // console.log(result);
    return result;
  }, err => {
    console.log(err);
  })

  return instance(config)
}