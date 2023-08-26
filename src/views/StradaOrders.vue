<script setup lang="ts">
import ordersApi from '@/api/ordersApi'
import type {Order, OrderWithCorrectDate} from '@/types'
import {format} from 'date-fns'
import {ru} from 'date-fns/locale'
import {ref, onMounted} from 'vue'
import {useUserStore} from '@/stores/user'
const userStore = useUserStore()

const orders = ref<Array<OrderWithCorrectDate>>([])
const isLoading = ref(false)

onMounted(() => getOrders())

async function getOrders() {
  try {
    isLoading.value = true
    const {data} = await ordersApi.getOrders()
    const correctData = data.map(order => ({
      ...order,
      correctDate: format(new Date(order.date), 'd MMMM y', {locale: ru})
    }))
    orders.value = correctData
  } catch (error) {
    alert(error)
  } finally {
    isLoading.value = false
  }
}

function getSeverity(order: Order) {
  return order.status === 'Выполнен' ? 'success' : 'danger'
}

async function updateOrder(order: Order) {
  const updatingOrder = {
    ...order,
    status: 'Выполнен'
  }
  await ordersApi.updateStatusOrder(updatingOrder)
  getOrders()
}

async function deleteOrder(id: number) {
  await ordersApi.deleteOrder(id)
  getOrders()
}
</script>

<template>
  <div
    v-if="isLoading"
    class="h-96 flex items-center justify-center"
  >
    Загрузка...
  </div>
  <div
    v-else-if="!isLoading && !orders.length"
    class="h-96 flex items-center justify-center"
  >
    Нет заказов
  </div>
  <StradaDataTable
    v-else
    :value="orders"
  >
    <StradaColumn
      header="№"
      field="id"
      sortable
    />

    <StradaColumn
      header="Имя клиента"
      field="name"
      sortable
    />

    <StradaColumn
      header="Адрес"
      field="address"
    />

    <StradaColumn
      header="Дата заказа"
      field="correctDate"
      sortField="date"
      sortable
    />

    <StradaColumn
      header="Статус"
      sortable
      sortField="status"
    >
      <template #body="slotProps">
        <StradaTag
          :value="slotProps.data.status"
          :severity="getSeverity(slotProps.data)"
        />
      </template>
    </StradaColumn>

    <StradaColumn
      header="Комментарий"
      field="comment"
    />

    <StradaColumn v-if="userStore.userRole === 'ADMIN'">
      <template #body="slotProps">
        <StradaButton
          v-if="slotProps.data.status === 'Новый'"
          icon="pi pi-check"
          outlined
          rounded
          class="mr-2"
          @click="updateOrder(slotProps.data)"
        />
        <StradaButton
          icon="pi pi-trash"
          outlined
          rounded
          severity="danger"
          @click="deleteOrder(slotProps.data.id)"
        />
      </template>
    </StradaColumn>
  </StradaDataTable>
</template>
