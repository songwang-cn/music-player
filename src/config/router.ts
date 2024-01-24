import { createRouter,createWebHashHistory, RouteRecordRaw } from 'vue-router'


export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/index.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router



