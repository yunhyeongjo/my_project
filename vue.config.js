const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/my_project', // <-- 이게 실제로 publicPath임 (base 아님)
})
