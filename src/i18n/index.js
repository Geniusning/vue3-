// @ts-nocheck
import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import ehLocale from './lang/en'
import store from '@/store'
const messages = {
  en: {
    msg: {
      ...ehLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

function getLanguage() {
  return store && store.getters && store.getters.language
}

const i18n = createI18n({
  // composition API
  legacy: false,
  // 全局使用t函数
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
