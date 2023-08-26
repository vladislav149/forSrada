import {defaultApiInstance} from '@/api'
import URLS from '@/api/URLS'
import type {Order} from '@/types'

const ordersApi = {
  getOrders() {
    return defaultApiInstance.get<Array<Order>>(URLS.ORDERS)
  },
  addOrder(order: Order) {
    return defaultApiInstance.post<Array<Order>>(URLS.ORDERS, order)
  },
  updateStatusOrder(order: Order) {
    const url = `${URLS.ORDERS}\\${order.id}`
    defaultApiInstance.put(url, order)
  },
  deleteOrder(id: number) {
    const url = `${URLS.ORDERS}\\${id}`
    defaultApiInstance.delete(url)
  }
}

export default ordersApi
