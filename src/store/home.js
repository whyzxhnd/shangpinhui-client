// home 模块vuex
import { reqCategoryList, reqBannerList, reqFloorList } from '@/api/index'


const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
};
const mutations = {
    // 修改三级联动的数据
    CATEGORYLIST(state, CategoryList) {
        state.categoryList = CategoryList;
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    }

};
const actions = {
    async categoryList({ commit }) {
        // 获取三级联动信息 返回的是一个promise结果,需要使用async,await
        let result = await reqCategoryList()
        if (result.code == 200) {
            // 提交给mutations,修改数据的值
            commit('CATEGORYLIST', result.data)
        }
        // console.log(result);
    },
    async getBannerList({ commit }) {
        let result = await reqBannerList()
        commit('BANNERLIST', result.data)
    },
    //  获取floor
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
        }
    }

}
const getters = {};
export default {
    // 暴露store类的实例
    state,
    mutations,
    actions,
    getters
}