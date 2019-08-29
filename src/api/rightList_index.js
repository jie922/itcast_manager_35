// 引入封装好的axios
import axios from '@/utils/myaxios.js'

// 获取权限列表数据
export const getAllrightList = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
