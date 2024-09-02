import {createWebHistory, createRouter} from 'vue-router';
import Login from "../views/user/Login.vue";
import Registration from "../views/user/Registration.vue";
import Personal from "../views/user/Personal.vue";
import Index from "../views/user/Index.vue"
import Show from "../views/user/Show.vue"
import Feed from "../views/user/Feed.vue"


const routes = [
    {path: '/users/index', component: Index, name: 'user.index'},
    {path: '/users/:id/show', component: Show, name: 'user.show'},
    {path: '/users/feed', component: Feed, name: 'user.feed'},
    {path: '/users/login', component: Login, name: 'user.login'},
    {path: '/users/registration', component: Registration, name: 'user.registration'},
    {path: '/users/personal', component: Personal, name: 'user.personal'}
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {

    axios.get('/api/user')
        .catch(e => {
            if (e.response.status === 401) {
                localStorage.key('x_xsrf_token') ? localStorage.removeItem('x_xsrf_token') : ''
            }
        })

    const token = localStorage.getItem('x_xsrf_token')

    if (!token) {
        if (to.name === 'user.login' || to.name === 'user.registration') {
            return next()
        } else {
            return next({
                name: 'user.login'
            })
        }
    }
    if (to.name === 'user.login' || to.name === 'user.registration' && token) {
        return next({
            name: 'user.personal'
        })
    }

    next()
})

export default router
