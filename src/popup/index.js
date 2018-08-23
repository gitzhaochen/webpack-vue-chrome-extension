import Vue from 'vue'
import App from './App.vue'
import i18n from '../i18n'
import Element from 'element-ui'

import '../common/common';

Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})
new Vue({
    el: '#app',
    i18n,
    render: h => h(App)
})
