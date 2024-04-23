import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from './App.vue'     //Our .vue startup file
import './static/global.css'    //Import css files as modules


const pinia = createPinia()


createApp(App).use(pinia).mount('#app');