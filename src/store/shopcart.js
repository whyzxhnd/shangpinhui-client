import { reqCardList, reqRemoveCart, reqUpdateCheckedById } from "@/api"
const state = {
    cartList: [] // 服务器返回过来的数据
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
        console.log('获取到了新数据');
    }
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCardList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
            return "ok"

        }
    },
    async removeCart({ commit }, skuId) {
        let result = await reqRemoveCart(skuId)
        if (result.code == 200) {
            // console.log(result);
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async updateCheckedById({ commit }, { skuID, isChecked }) {
        // console.log(skuID, isChecked);
        let result = await reqUpdateCheckedById(skuID, isChecked)
        // console.log(result);
        if (result.code == 200) {
            // console.log(skuID, isChecked);
            // return Promise.reject('bad')
            return Promise.resolve('ok')
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //  使用promise.all来完成 删除选中的商品   // 仍然存在问题..
    deleteAllSelectedGoods({ dispatch, getters }) {
        // console.log(context);
        let PromiseAll = []
        // 在下面的方法中加上await ,等待 所有异步操作执行完毕 ,之后才return promise.all
        getters.cartList.cartInfoList.forEach(item => {
            if (item.isChecked == 1) {
                // 
                let promise = changeAllchecked('removeCart', item.skuId)

                PromiseAll.push(promise)
            }
        });
        // console.log('数组为', PromiseAll);

        // PromiseAll 里面存储的分别是promise对象.  [promise1,promise2,.... ]
        // 只有所有的结果都成功才能返回成功的结果 ,只要有一个失败就返回失败的结果,配合try catch 使用,来判断是否所有的被选中的都能够被删除
        // return Promise.all(PromiseAll) //Promise.all 为打印
        return Promise.all(PromiseAll)
    },
    //  使用promise.all 通过点击 全选来控制商品的选中状态
    async changeAllchecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        // console.log('开始调用了2');
        state.cartList[0].cartInfoList.forEach(item => {
            if (item.isChecked != isChecked) {
                // 在这里直接改变了state里面的数据了,所以即使没有重新获取数据仍然可以持久化存储
                // item.isChecked = isChecked
                //  后面的是一个promise对象 注意 下面不能够加await , 否则会造成渲染不上的情况
                let promise = dispatch('updateCheckedById', { skuID: item.skuId, isChecked })
                // console.log('赋值为', promise);
                promiseAll.push(promise)
            }
        })
        // console.log("全选的promise数组", Promise.all(promiseAll));
        // let a = await Promise.all(promiseAll)
        // console.log('此时的a', a);
        // console.log(Promise.all(promiseAll));
        return Promise.all(promiseAll) //
    }

}
const getters = {
    // 将反会的数据进行简化处理 
    // 存储购物车的属性
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    state,
    mutations,
    getters,
    actions,
}