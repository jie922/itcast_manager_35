// 引入封装好的axios
import axios from '@/utils/myaxios.js'
// 获取所有角色列表数据
export const getAllRoleList = () => {
  return axios({
    url: 'roles'
  })
}

// 删除角色指定的权限
export const delrRightByRoleId = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
