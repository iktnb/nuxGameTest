import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from './App.vue'     //Our .vue startup file
import './static/global.css'    //Import css files as modules
import router from './router'

const pinia = createPinia()


createApp(App).use(pinia).use(router).mount('#app');