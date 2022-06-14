// 管理api
import requests from "./request";
// 引入mockajax模拟数据
import mockRequests from "./mock"

// 三级分类请求地址 /api/product/getBaseCategoryList

export const reqCategoryList = () => {
    return requests.get('/product/getBaseCategoryList')
}
export const reqBannerList = () => {
    return mockRequests.get('/banner')
}
// 楼层
export const reqFloorList = () => mockRequests.get('/floor')
// 搜索商品 参数至少是一个{},空对象
export const reqGetSearchList = (data) => {
    return requests.post('/list', data)
}
//  获取商品详情
export const reqGoodsInfo = (data) => {
    return requests.get(`/item/${data}`)
}
//  添加或更新购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
}
// 获取购物车列表
export const reqCardList = () => {
    return requests.get('/cart/cartList')
}
// 删除购物车
export const reqRemoveCart = (skuId) => {
    return requests.delete(`/cart/deleteCart/${skuId}`)
}
// 修改商品的选中状态
export const reqUpdateCheckedById = (skuID, isChecked) => {
    return requests.get(`/cart/checkCart/${skuID}/${isChecked}`)
}
// 获取验证码接口
export const reqGetCode = (phone) => {
    // console.log(222);
    return requests.get(`/user/passport/sendCode/${phone}`)
}
//  
export const reqUserRegister = (data) => {
    return requests.post(`/user/passport/register`, data)
}
//  登录接口
export const reqUserLogin = (data) => {
    return requests.post(`/user/passport/login`, data)
}
//  获取用户信息
export const reqGetUserInfo = () => {
    return requests.get(`/user/passport/auth/getUserInfo`)
}
// 退出登录
export const reqLogOut = () => {
    return requests.get(`/user/passport/logout`)
}
// 获取用户地址
export const reqAdressInfo = () => {
    return requests.get(`/user/userAddress/auth/findUserAddressList`)
}
// 获取订单交易页信息
export const reqOrderInfo = () => {
    return requests.get(`/order/auth/trade`)
}
// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
    return requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)
}
// 获取支付信息
export const reqPayInfo = (orderId) => {
    return requests.get(`/payment/weixin/createNative/${orderId}`)
}
//  获取支付订单状态 /payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => {
    return requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
}
// 获取个人中心我的订单 // /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => {
    return requests.get(`/order/auth/${page}/${limit}`)
}

