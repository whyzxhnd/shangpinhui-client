// search 模块vuex
import { reqGetSearchList } from '@/api'
const state = {
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }

};
const actions = {
    // 
    async getSearchList({ commit }, data = {}) {
        let result = await reqGetSearchList(data)
        if (result.code == 200) {
            console.log(`获取商品信息`);

            commit('GETSEARCHLIST', result.data)
        }

    }
}
// 相当于计算属性,用来简化仓库中的数据
const getters = {
    goodsList(state) {
        console.log(`getters`);
        return state.searchList.goodsList || []   // 防止出现undefied
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []  // 防止出现undefied
    },
    attrsList(state) {
        return state.searchList.attrsList || []  // 防止出现undefied
    },
};
export default {
    // 暴露store类的实例
    state,
    mutations,
    actions,
    getters
}