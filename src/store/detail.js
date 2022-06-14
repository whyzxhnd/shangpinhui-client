import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
// import { resolve } from "core-js/fn/promise"
// 加入购物车需要 确定游客的身份,因此需要获取一个uuid
import { getUUID } from "@/utils/uuid_token"

const state = {
    goodInfo: {},
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    },
    // ADDORUPDATESHOPCART(state,skuId,skuNum){
    //     state
    // }
}
const actions = {
    // 获取商品信息
    async getGoodsInfo({ commit }, data) {
        let result = await reqGoodsInfo(data)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //  添加或修改购物车
    async AddOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            // console.log('加入成功');
            return "ok"
        } else {
            // console.log('参数失败');
            return Promise.reject(new Error(result.message))
        }
    }
}
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {} // 当没有数据时  undefined || {} 
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    getters,
    actions,
}