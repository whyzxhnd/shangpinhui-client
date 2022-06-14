// 二次封装axios
import axios from "axios";
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"

// console.log(nprogress);

// 配置请求对象
const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000,
})
// 请求拦截器     
requests.interceptors.request.use((config) => {
    // config 里有一个请求头 headers
    nprogress.start()
    return config
})
// 响应拦截器     
requests.interceptors.response.use(
    (res) => {
        // 成功的回调

        nprogress.done()
        return res.data;

    }, (err) => {
        // 失败的回调
        console.log(err);
        return Promise.reject(new Error('faile'))
    })

export default requests