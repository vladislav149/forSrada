import {defaultApiInstance} from '@/api'
import URLS from '@/api/URLS'
import type {User, UserResponse} from '@/types'

const authApi = {
  login(data: User) {
    return defaultApiInstance.post<UserResponse>(URLS.LOGIN, data)
  }
}

export default authApi
