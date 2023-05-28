import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/js/dist/tab' // for nab tab
import 'bootstrap/js/dist/modal' // for modal

// import VueFire from 'vuefire'
import '@/css/font.css'

createApp(App).use(router).mount('#app')
