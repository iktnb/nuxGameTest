import { createRouter, createWebHashHistory } from 'vue-router'
import Todo from '@/views/Todo.vue'
import Login from '@/views/Login.vue'
import User from '@/views/User.vue'

const routes = [
    {
        path: '/',
        name: 'Todo',
        component: Todo,
        meta: { requiresAuth: true },
    },
    {
        path: '/user',
        name: 'User',
        component: User,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('currentUser')) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
        next();
    } else {
        next();
    }
});


export default router