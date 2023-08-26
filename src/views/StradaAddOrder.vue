<script setup lang="ts">
import ordersApi from '@/api/ordersApi'
import getRandomNumber from '@/helpers/getRandomNumber'
import {computed, reactive, ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const minId = 0
const maxId = 9999
const isLoading = ref(false)
const labelButton = computed(() => (isLoading.value ? 'Загрузка...' : 'Добавить Заказ'))
const isValidForm = computed(() => {
  const isValidName = Boolean(order.name)
  const isValidAddress = Boolean(order.address)
  return isValidName && isValidAddress
})

const order = reactive({
  name: '',
  address: '',
  comment: ''
})

async function addOrder() {
  const data = {
    ...order,
    id: getRandomNumber(minId, maxId),
    date: Date.now(),
    status: 'Новый'
  }
  try {
    await ordersApi.addOrder(data)
    router.push({name: 'orders'})
  } catch (error) {
    alert(error)
  }
}
</script>

<template>
  <section class="pt-8">
    <form @submit.prevent="addOrder">
      <span class="p-float-label mb-8">
        <StradaInputText
          id="name"
          v-model="order.name"
        />
        <label for="name">{{ 'Имя' }}</label>
      </span>

      <span class="p-float-label mb-8">
        <StradaInputText
          id="address"
          v-model="order.address"
        />
        <label for="address">Адрес</label>
      </span>

      <span class="p-float-label mb-8">
        <StradaInputText
          id="comment"
          v-model="order.comment"
        />
        <label for="comment">Комментарий</label>
      </span>

      <StradaButton
        class="self-center w-48"
        type="submit"
        :label="labelButton"
        :disabled="!isValidForm || isLoading"
      />
    </form>
  </section>
</template>
