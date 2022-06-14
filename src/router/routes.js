// 引入路由组件
// 使用路由懒加载来代替下面的引入方式 (箭头函数加import 结合) 可以优化项目的速度
// import Home from '@/pages/Home'
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"

// 引入二级路由
import MyOrder from "@/pages/Center/myOrder"
import GroupOrder from "@/pages/Center/groupOrder"

export default [
    {
        path: '/center',
        component: Center,
        // 采取meta属性:路由元信息与v-show搭配来控制,footer组件是否显示,
        meta: { show: false },

        // 二级路由组件
        children: [{
            path: 'myorder',
            component: MyOrder,
        }, {
            path: 'grouporder',
            component: GroupOrder,
        }, {
            path: '/center',
            redirect: "/center/myorder",
        },

        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        // 采取meta属性:路由元信息与v-show搭配来控制,footer组件是否显示,
        meta: { show: false }
    },
    {
        path: '/pay',
        component: Pay,
        // 采取meta属性:路由元信息与v-show搭配来控制,footer组件是否显示,
        meta: { show: true },
        // 在路由跳转之前判断是否是从交易页面跳转的
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
                // next(from.path)
            }
        }
    },
    {
        path: '/trade',
        component: Trade,
        // 采取meta属性:路由元信息与v-show搭配来控制,footer组件是否显示,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
                // next(from.path)
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        // 采取meta属性:路由元信息与v-show搭配来控制,footer组件是否显示,
        meta: { show: true }
    },
    {
        path: '/home',
        // 使用路由懒加载 只有第一次访问的时候才开始加载这个组件
        component: () => {
            // console.log('111开始加载home组件了');
            return import('@/pages/Home')
        },
        // 采取meta属性:路由元信息与v-show搭配来控制,footer组件是否显示,
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search'
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: { show: false }
    },

    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true },
        name: "addcartsuccess"
    },

    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    }, {
        path: '*',
        redirect: "/home"

    }
]