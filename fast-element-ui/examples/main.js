import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import { FastTextInput } from 'fast-element-ui'
import 'fast-element-ui/lib/theme-default/index.css'
// import '../lib/theme-default/index.css'
// Vue.use(FastButton)
// console.log('bbb' ,fastElementUI);
// console.info('1111111111111111111111111111111');
Vue.use(FastTextInput)
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
