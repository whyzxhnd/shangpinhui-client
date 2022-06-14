// 登录与注册仓库
import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqLogOut } from "@/api"
import { getToken, setToken, removeToken } from "@/utils/token"
const state = {
    code: '',
    token: getToken() || '',
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        state.userInfo = ''
        state.token = ''
        removeToken()
    }

}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)

        }
    },
    // 注册
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        if (result.code == 200) {
            return "ok"
        } else {
            console.log(result.message);
            return Promise.reject(new Error(result.message))
        }
    },
    // 登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // console.log(result);
        if (result.code == 200) {
            setToken(result.data.token)
            // localStorage.setItem('TOKEN', result.data.token)
            commit('USERLOGIN', result.data.token)

            return "ok"
        } else {

            return Promise.reject(new Error(result.message))
        }
    },
    // 退出
    async userLogOut({ commit }) {
        let result = await reqLogOut()
        // console.log(result);
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }

    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo()
        // console.log(result);
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return "ok"
        } else {
            return Promise.reject(new Error(result.message))
        }

    }
}
const getters = {}
export default {
    state,
    mutations,
    getters,
    actions,
}