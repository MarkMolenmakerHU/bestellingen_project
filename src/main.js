import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";

axios.defaults.baseURL = 'https://ojo3a4gtxi.execute-api.eu-central-1.amazonaws.com'

createApp(App).use(store).use(router).mount('#app')
