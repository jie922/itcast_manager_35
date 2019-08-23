// 引入封装的axios
import axios from '@/utils/myaxios.js'
// 实现登录验证
export const login = (data) => {
  return axios({
    // 请求的路由名称，因设置过基准路径，故axios会自行拼接
    url: 'login',
    // 请求方式
    method: 'post',
    // 传递的数据，get的方式使用params；post方式使用data
    data
  })
}
