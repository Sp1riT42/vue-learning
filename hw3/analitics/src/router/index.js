import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//import NewCost from "@/components/NewCost";
export default new Router({
    mode: 'history',
    routes: [
        // {path: '/add/payment/Food:value', component: () => import('../components/NewCost.vue')}
        //{path: '/add/payment/:category/:value'}
        {path: '/add/payment/:category'}
    ]
})