import { createApp } from 'vue'
import App from './App.vue'
import router from '@/config/router'
import './assets/css/main.scss'
import './assets/iconfont/iconfont.js'
import { createPinia } from 'pinia'
import Vant from 'vant';
import { ConfigProvider } from 'vant';
import 'swiper/css';

createApp(App)
    .use(Vant)
    .use(router)
    .use(ConfigProvider)
    .use(createPinia())
    .mount('#app')

