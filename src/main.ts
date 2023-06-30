import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { router } from '@/plugins/router'
import { i18n } from '@/plugins/i18n'
import { GlobalProvide } from '@/plugins/vue/3.3/app-run-with-context'
import { VueQueryPlugin } from "vue-query"
import { queryClient } from '@/plugins/vue-query'
import { ElLoading } from 'element-plus'
import { MSWPlugin } from '@/plugins/msw'

createApp(App)
.use(router)
.use(i18n)
.use(GlobalProvide)
.use(VueQueryPlugin, { queryClient })
.use(ElLoading)
.use(MSWPlugin)
.mount('#app')
