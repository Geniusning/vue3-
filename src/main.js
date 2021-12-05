// @ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import installSvgIcon from '@/icons'
// 初始化样式
import '@/styles/index.scss'
import './permission'

const app = createApp(App)
installSvgIcon(app)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
