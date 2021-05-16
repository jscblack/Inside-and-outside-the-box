import Vue from 'vue'
import App from './App'
import myTabbar from './components/myTabbar.vue'

Vue.component('my-tabbar', myTabbar)

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$imgHide= { status: false };
const app = new Vue({
    ...App
})
app.$mount()
