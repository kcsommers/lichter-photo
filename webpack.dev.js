const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const fs = require('fs');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    https: {
      cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.cer')),
      key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "Content-Type": "text/html; chartset=utf-8"
    },
    // index: 'index.bundle.js',
    contentBase: './dist',
    useLocalIp: true
  },
})