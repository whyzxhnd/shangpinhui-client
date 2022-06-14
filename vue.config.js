module.exports = {
    // 在打包的过程中不生成map文件.
    productionSourceMap: false,
    // 关闭eslint
    lintOnSave: false,
    // 配置代理,解决跨域问题
    devServer: {
        proxy: {
            // 当路径中有/api ,那么将会使用代理服务器来发送请求
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                // pathRewrite: { '^/api': '' }, // 路径重写
            },
        },
    },
    configureWebpack: {
        devtool: 'source-map'
      },

}