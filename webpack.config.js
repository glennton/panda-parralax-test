const debug = process.env.NODE_ENV !== "production"
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //source
  entry: `${path.join(__dirname,'public','src')}/main.js`,
  devtool: 'source-map',
  //output
  output: {
    path: path.join(__dirname,'public','dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias : {
      __assetDir: path.resolve(__dirname,  path.join(__dirname,'public','src','assets') ),
      __componentDir: path.resolve(__dirname, path.join(__dirname,'public','src','components') ),
      __scenesDir: path.resolve(__dirname, path.join(__dirname,'public','src','scenes') )
    }
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
        test: [/\.png$/, /\.svg$/],
        loader: 'file-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname,'public','src'),
    inline: true,
    stats: 'errors-only'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${path.join(__dirname,'public','src')}/index.jade`,
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
