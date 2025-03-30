import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import router from './router'
import './api/mymock'
import api from './api/api'

const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$api = api
app.use(router)
app.use(pinia)
app.mount('#app')
