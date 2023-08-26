import {defaultApiInstance} from '@/api'
import URLS from '@/api/URLS'
import type {UserResponse} from '@/types'

const userApi = {
  getUser() {
    return defaultApiInstance.get<UserResponse>(URLS.USER)
  }
}

export default userApi
