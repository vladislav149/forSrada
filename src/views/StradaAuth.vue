<script lang="ts" setup>
import {computed, reactive, ref} from 'vue'
import type {User} from '@/types'
import {useUserStore} from '@/stores/user'
import {useRouter} from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const user = reactive<User>({
  login: '',
  password: ''
})

const isLoading = ref(false)
const labelButton = computed(() => (isLoading.value ? 'Загрузка...' : 'Войти'))
const isValidForm = computed(() => {
  const isValidLogin = user.login.length > 3
  const isValidPassword = user.password.length > 7
  return isValidLogin && isValidPassword
})

const error = reactive({
  hasError: false,
  textError: ''
})

async function auth() {
  try {
    error.hasError = false
    isLoading.value = true
    const response = await userStore.login(user)
    if (response === true) {
      return router.push({name: 'orders'})
    } else {
      error.hasError = true
      error.textError = response
    }
    isLoading.value = false
    user.login = ''
    user.password = ''
  } catch (error) {
    alert(error)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <form
      class="px-10 py-24 bg-gray-400 flex flex-col"
      @submit.prevent="auth"
    >
      <span class="p-float-label mb-8">
        <StradaInputText
          id="login"
          v-model="user.login"
          autofocus
        />
        <label for="login">Логин</label>
      </span>

      <span class="p-float-label mb-8 relative">
        <StradaInputPassword
          id="password"
          v-model="user.password"
          :feedback="false"
        />
        <label for="password">Пароль</label>
        <span
          v-if="error.hasError"
          class="absolute left-0 top-14 text-red-800"
          >{{ error.textError }}</span
        >
      </span>

      <StradaButton
        class="self-center w-28"
        type="submit"
        :label="labelButton"
        :disabled="!isValidForm || isLoading"
      />
    </form>
  </div>
</template>
