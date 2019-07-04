const path = require('path')

module.exports = {
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./docs/main.ts')
      .end()
    config.resolve.alias.set('@', path.join(__dirname, './docs'))
    config.resolve.alias.set('lib', path.resolve(__dirname, 'vue-sliding-panel'))
  }
}
