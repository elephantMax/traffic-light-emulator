import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/:color',
        name: 'Home',
        component: () => import('../App.vue')
    }
]

const router = new VueRouter({routes: routes, mode: 'history'})

export default router