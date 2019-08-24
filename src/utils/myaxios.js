// 引入axios
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://192.168.70.86:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么:获取token，设置请求头
//  1. 获取token
  let mytoken = localStorage.getItem('itcast_manager_35_Token')
  //   判断是否有token值
  if (mytoken) {
    //   console.log(config)
  //  2. 设置请求头：config.headers是个对象，里面包含当前请求头的设置
    config.headers.Authorization = mytoken
  }

  return config // config可理解为报文
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加登录验证方法
// export const login=(){
//     return axios()
// }

export default axios
