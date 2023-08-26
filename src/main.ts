import './assets/main.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import PrimeVue from 'primevue/config'
import globalComponents from '@/plugins/globalComponents'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue).use(globalComponents).use(router).use(createPinia()).mount('#app')
