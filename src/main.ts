import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { router } from '@/plugins/router'
import { i18n } from '@/plugins/i18n'
import { GlobalProvide } from '@/plugins/vue/3.3/app-run-with-context'

createApp(App)
.use(router)
.use(i18n)
.use(GlobalProvide)
.mount('#app')
