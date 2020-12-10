import Vue from 'vue'
import Router from 'vue-router';
import layer from './layer';
Vue.use(Router)

const RouterModel = new Router({
    mode: 'history',    
    routes: [...layer]
})

// RouterModel.beforeEach((to, from, next) => {
//     next()
// })

//路由导航守卫
RouterModel.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    // const tokenStr = window.sessionStorage.getItem('token')
    // if (!tokenStr) return next('/login')
    next()
})
export default RouterModel;
