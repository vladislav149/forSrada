import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {User} from '@/types'
import authApi from '@/api/authApi'
import userApi from '@/api/userApi'
import {AxiosError} from 'axios'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userRole = ref('')
  const userName = ref('')

  async function login(user: User) {
    try {
      const {data} = await authApi.login(user)
      localStorage.setItem('token', data.token)
      token.value = data.token
      userRole.value = data.role
      userName.value = data.name
      return true
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message
      }
    }
  }

  async function getUser() {
    try {
      const {data} = await userApi.getUser()
      userRole.value = data.role
      userName.value = data.name
      return true
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message
      }
    }
  }

  function logout() {
    return new Promise(resolve => {
      localStorage.removeItem('token')
      token.value = ''
      userRole.value = ''
      userName.value = ''
      resolve('')
    })
  }

  return {token, userRole, userName, login, logout, getUser}
})
