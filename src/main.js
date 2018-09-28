import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import App from './App.vue'
import router from './router'
import store from './store'
import StaUI from '@kd/starui'
import '@kd/starui/build/theme-didi/index.css'

window.eventHub = new Vue();

Vue.use(ElementUI);
// Vue.use(StaUI);
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
