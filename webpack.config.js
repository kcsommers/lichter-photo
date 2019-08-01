const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = {
//   mode: 'development',
//   entry: {
//     index: './src/index.js',
//     // print: './src/print.js',
//     another: './src/another-module.js'
//   },
//   devtool: 'inline-source-map',
//   devServer: {
//     contentBase: './dist'
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       title: 'Output Management'
//     })
//   ],
//   output: {
//     filename: '[name].bundle.js',
//     chunkFilename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   // optimization: {
//   //   splitChunks: {
//   //     chunks: 'all'
//   //   }
//   // },
//   module: {
//     rules: [
//       {
//         test: /\.(css|scss)$/,
//         use: [
//           'style-loader',
//           'css-loader',
//           'sass-loader'
//         ]
//       }
//     ]
//   }
// };


module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    // another: './src/another-module.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Lichter Photo'
    })
  ]
};