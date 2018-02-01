import Vue from 'vue'
import Router from 'vue-router'

import QIndex from '@/components/index' //调查问卷
import QStart from '@/components/start' //调查问卷

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'QIndex',
      component: QIndex
    },
    {
      path: '/start',
      name: 'QStart',
      component: QStart
    },
    {
      path: '*',
      name: 'QStart',
      component: QStart
    }
  ]
})
