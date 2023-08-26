<script lang="ts" setup>
import {useUserStore} from '@/stores/user'
import {onMounted} from 'vue'
const userStore = useUserStore()

async function logout() {
  await userStore.logout()
  location.reload()
}

onMounted(() => userStore.getUser())
</script>

<template>
  <div class="bg-blue-700 text-white h-14 flex justify-between items-center px-5">
    <div class="flex h-full">
      <RouterLink
        class="flex items-center mr-8 transition duration-300"
        :to="{name: 'orders'}"
      >
        Все заказы
      </RouterLink>
      <RouterLink
        class="flex items-center transition duration-300"
        :to="{name: 'addOrder'}"
      >
        Добавить заказ
      </RouterLink>
    </div>

    <div class="flex items-center">
      <span class="mr-8">{{ userStore.userName || 'Загрузка...' }}</span>
      <StradaButton
        label="Выйти"
        severity="warning"
        @click="logout"
      />
    </div>
  </div>
</template>
