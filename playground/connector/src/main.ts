import { createApp } from 'vue'
import * as zrender from 'zrender'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import CanvasPainter from 'zrender/lib/canvas/Painter.js'

zrender.registerPainter('canvas', CanvasPainter)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
