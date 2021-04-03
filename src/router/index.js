import VueRouter from 'vue-router'
import Vue from 'vue'

// 安装插件
Vue.use(VueRouter)

//懒加载导入相关view中组件
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const ShopCart = () => import('views/shopcart/ShopCart')
const User = () => import('views/user/User')
const Detail = () => import('views/detail/Detail')


//创建实例并配置相应的映射关系
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/user',
    component: User
  },
  {
    // 动态路由获取iid
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//导出，将router对象传入Vue实例当中(main.js中)
export default router
