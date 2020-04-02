import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import {FastButton} from 'fast-element-ui'
// import '../lib/theme-default/index.css'
// Vue.use(FastButton)
// console.log('bbb' ,fastElementUI);
console.info('1111111111111111111111111111111');
Vue.use(FastElementUI)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
