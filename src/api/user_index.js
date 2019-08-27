// 引入封装好的axios
import axios from '@/utils/myaxios.js'
// 获取所有用户数据
export const getAllUsers = (params) => {
  return axios({
    url: 'users',
    params
  })
}

// 实现用户数据的新增
export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

// 实现用户数据的编辑
export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

// 实现用户角色分配
export const grantUserRole = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data: { rid: data.rid }
  })
}

// 实现用户的删除
export const delUserById = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 修改用户状态
export const getUserstate = (uId, type) => {
  return axios({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}
