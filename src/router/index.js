
import VueRouter from "vue-router";
import Vue from "vue";
import Routes from "@/router/routes";
import store from "@/store"
// 使用插件
Vue.use(VueRouter)

// 重写VueRouter的push方法,解决传递参数相同报错的问题,
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace;

// 重写push| replace   (location: 向哪里传递参数)
VueRouter.prototype.push = function (location, resolve, reject) {
    //第一个形参：路由跳转的配置对象（query|params）
    //第二个参数：undefined|箭头函数（成功的回调）
    //第三个参数:undefined|箭头函数（失败的回调）
    // 如果传递了成功的回调函数与失败的回调函数
    if (resolve && reject) {
        //push方法传递第二个参数|第三个参数（箭头函数）
        //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
        originPush.call(this, location, resolve, reject);
    } else {
        //push方法没有产递第二个参数|第三个参数
        originPush.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};
const router = new VueRouter({
    routes: Routes,
    //  使用vue-router重置滚动条
    scrollBehavior() {
        // 始终滚动到顶部 vue3.0 使用top,left,来控制,2.0 使用x,y
        return { y: 0 }
    },

})
// 全局守卫
router.beforeEach(async (to, from, next) => {
    // next()
    // console.log(to, from, next);
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 已登录
    if (token) {
        if (to.path == "/login") {
            next('/home')
        } else {
            // 存在登陆信息
            if (name) {
                next()
            } else {
                // 不存在登录信息
                try {
                    await store.dispatch("getUserInfo");
                    // console.log("获取到用户信息");
                    next()
                } catch (error) {
                    // token存在但是已经过期了
                    await store.dispatch('userLogOut')
                    // console.log(error.message);
                    // console.log("没有获取到用户信息");
                    next("/login")
                }

            }
        }
    } else {
        // 未登录
        // console.log("未登录");
        let toPath = to.path
        //  当路径中存在 /trade时
        if (toPath.indexOf("/trade") != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/center") != -1) {
            next("/login?redirect=" + toPath)
            alert("请先进行登录")
        } else {
            next();
        }

    }

})


// 配置路由
export default router