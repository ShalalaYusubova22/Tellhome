import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
import VueAwesomePaginate from "vue-awesome-paginate";


import App from './App.vue'


// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import '@/assets/styles/main.scss'

const app = createApp(App)
app.use(router)
   .use(createPinia())
   .use(VueAwesomePaginate)
   .mount('#app')
