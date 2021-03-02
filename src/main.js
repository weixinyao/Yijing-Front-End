import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/reset.css'
import '@/assets/style/iconfont.css'
import '@/utils/validate.js'
import fastClick from 'fastclick'
fastClick.attach(document.body)
import Vant from 'vant';
import 'vant/lib/index.css';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Vant);
Vue.use(MintUI);
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import 'swiper/css/swiper.min.css';
let options = {
  fullscreenEl: false
};
Vue.use(preview, options)
Vue.use(preview)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')