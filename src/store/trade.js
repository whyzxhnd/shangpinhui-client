// 结算购物车页面
import { reqAdressInfo, reqOrderInfo } from "@/api"

const state = {
    addressInfo: [],
    orderInfo: {},
}
const mutations = {
    GETADDRESSINFO(state, addressInfo) {
        state.addressInfo = addressInfo
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取地址信息
    async getAddressInfo({ commit }) {
        let result = await reqAdressInfo()
        if (result.code == 200) {
            commit('GETADDRESSINFO', result.data)
        }
        // console.log(result);
    },
    // 获取订单交易页信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
        // console.log(result);
    }

}
const getters = {}
export default {
    state,
    mutations,
    getters,
    actions,
}