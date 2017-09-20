const debug = process.env.NODE_ENV !== "production"
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //source
  entry: './public/src/main.js',
  devtool: 'source-map',
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
          presets: ['es2015','stage-0', 'react'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      //SASS
      {
        test: [/\.scss$/],
        exclude: /(node_modules)/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      //CSS
      {
        test: [/\.css$/],
        exclude: /(node_modules)/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      //PUG
      {
        test: /\.jade$/,
        loader: 'html-loader!pug-html-loader'
      },
      //images
      {
        test: /\.png$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  devServer: {
    contentBase: './public/src',
    inline: true,
    stats: 'errors-only'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/src/index.jade',
      hash: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
}
