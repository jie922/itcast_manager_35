// 引入axios
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://192.168.70.86:8888/api/private/v1/'
// 添加登录验证方法
// export const login=(){
//     return axios()
// }

export default axios
