import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createPinia } from 'pinia'

axios.defaults.baseURL = 'http://13.114.100.49:8080'
// axios.defaults.baseURL = 'http://127.0.0.1:8000'

const pinia = createPinia()


createApp(App).use(store).use(router, axios).use(pinia).mount('#app')