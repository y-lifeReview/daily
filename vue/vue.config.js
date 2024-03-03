const UploadSourceMapPlugin = require('./plugin/uploadSourceMapPlugin') 
// const fs  = require('fs')
const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/',
  runtimeCompiler: false, //去掉console
  chainWebpack(config) {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  },
  configureWebpack:{
      devtool:'source-map',
      plugins:[
        new UploadSourceMapPlugin({uploadUrl:process.env.VUE_APP_BASE_API+'sourcemap/upload',apikey:'ycc'})
      ]
  },
  productionSourceMap:true

})