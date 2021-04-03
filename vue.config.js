module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        // "@":"src"  已经配置过了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
