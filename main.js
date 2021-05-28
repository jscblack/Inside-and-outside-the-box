import Vue from 'vue'
import App from './App'
import myTabbar from './components/myTabbar.vue'

Vue.component('my-tabbar', myTabbar)

Vue.config.productionTip = false
function PrefixZero(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
Vue.prototype.tansf=function(utc_datetime) {
	const time = new Date(utc_datetime);
	return time.getFullYear() + '-' + PrefixZero(time.getMonth() + 1, 2) + '-' + PrefixZero(time.getDate(), 2) + ' ' + PrefixZero(time.getHours(), 2) +
		':' + PrefixZero(time.getMinutes(), 2) + ':' + PrefixZero(time.getSeconds(), 2);
}
App.mpType = 'app'
Vue.prototype.$imgHide= { status: false };
const app = new Vue({
    ...App
})
app.$mount()
