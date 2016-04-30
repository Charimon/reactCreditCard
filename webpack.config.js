'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var bourbon = require('node-bourbon');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var sprite = require('sprite-webpack-plugin');


module.exports = {
  entry: path.join(__dirname, 'src/index.jsx'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new sprite({
      'source' : __dirname + '/src/sprites/',
      'imgPath': __dirname + '/src/assets/',
      'cssPath': __dirname + '/src/',
      'scale': 2,
      'bundleMode': 'multiple'
    })
  ],
  module: {
    loaders: [
      {test: /\.woff$/, loader: 'url?limit=100000'},
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        }
      },
      {test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.sass$/, loader: `style!css!sass?indentedSyntax&includePaths[]=${bourbon.includePaths}` },
      {test: /.*\.(gif|png|jpe?g|svg)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}']},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
}

/*
module.exports = {
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app/index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
*/
