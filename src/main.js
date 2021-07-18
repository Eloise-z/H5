import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element ui 及 css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// vue 全局使用element
Vue.use(ElementUI)
Vue.prototype.$message = ElementUI.Message;

// 引入全局样式
import './assets/global.css'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
