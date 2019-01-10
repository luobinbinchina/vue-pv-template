import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils/utils'

window.eventHub = new Vue();

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

// 路由拦截器
router.beforeEach((to, from, next) => {
  // 判断是否登录过 TODO: 校验ticket是否失效
  if (utils.getCookie('userInfo')) {
    if(!store.getters['user/ticket']) {
      let info = JSON.parse(utils.getCookie('userInfo'));
      info.username_zh = decodeURI(info.username_zh);
      store.commit('user/setUser', info);
    }
    next()
  } else {
    store.dispatch("user/login")
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
