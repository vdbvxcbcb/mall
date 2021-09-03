import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000/api/h8",
    timeout: 5000
  });

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log('error')
  });

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log('error')
  });

  return instance(config);
}