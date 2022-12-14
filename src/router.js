import Home from './components/Home.vue' 
import SignUp from './components/SignUp.vue' 
import Login from './components/Login.vue' 
import Data from './components/Data.vue'
import {createRouter,createWebHistory} from 'vue-router'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            name:'Home',
            component:Home,
            path:'/',
        },
        {
            name:'SignUp',
            component:SignUp,
            path:'/sign-up',
        },        
        {
            name:'Login',
            component:Login,
            path:'/login',
        },
        {
            name:'Data',
            component:Data,
            path:'/data/:id'
        }

    ]
})

export default router;