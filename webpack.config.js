var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //source
  entry: './public/src/components/scripts.js',
  //output
  output: {
    path: path.join(__dirname,'public','dist','scripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      //BABEL - JS
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      //SASS
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      //PUG
      {
        test: /\.jade$/,
        loader: 'html-loader!pug-html-loader'
      }
    ]
  },
  devServer: {
    contentBase: './public/dist',
    inline: true,
    stats: 'errors-only'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/src/index.jade',
      hash: true
    })
  ]
}
