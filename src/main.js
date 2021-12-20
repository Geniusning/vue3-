// @ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import installSvgIcon from '@/icons'
import i18n from '@/i18n'
// 初始化样式
import '@/styles/index.scss'
import './permission'

const app = createApp(App)
installSvgIcon(app)
app.use(store)
app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.mount('#app')
console.log('app config', app.config)
