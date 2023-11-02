import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { EventEmitter } from '@qftjs/tiny-editor-core'
import App from './App.vue'
import router from './router'
import './assets/main.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)

const bus = new EventEmitter()
app.provide('$bus', bus)
app.config.globalProperties.$bus = bus

app.mount('#app')
