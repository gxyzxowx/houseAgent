/*
 * @Date         : 2019-12-11 16:50:10
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-05-29 10:51:43
 * @FilePath     : \agent\vue.config.js
 */
module.exports = {
  // devServer: {
  //   proxy: {
  //     '/agent': {
  //       target: 'http://fangchan.caimaomeng.com/agent',
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/agent': ''
  //       }
  //     }
  //   }
  // },
  // 解决scss文件全局引入的问题
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './src/assets/scss/init.scss'
        })
        .end()
    })
  }
}
