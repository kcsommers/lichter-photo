const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'https://cdn.jsdelivr.net/gh/kcsommers/lichter-photo@0.0.11/dist/index.bundle.js'
  },
});