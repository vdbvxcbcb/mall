module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'commonjs': '@/commonjs',
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}