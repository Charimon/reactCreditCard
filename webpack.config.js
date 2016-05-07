'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bourbon = require('node-bourbon');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const sprite = require('sprite-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');


const host = 'localhost';
const port = '9000';

const config = {
  entry: {
    "example": path.join(__dirname, 'example/index.jsx')
  },
  output: {
    path: path.join(__dirname, '/example/'),
    filename: '[name].js',
    publicPath: path.join(__dirname, '/')
  },
  plugins: [
      new NpmInstallPlugin(),
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
          plugins: ["add-module-exports"]
        }
      },
      {test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.sass$/, loader: `style!css!sass?indentedSyntax&includePaths[]=${bourbon.includePaths}` },
      {test: /.*\.(gif|png|jpe?g|svg)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}']},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}

new WebpackDevServer(webpack(config), {
  contentBase: './example',
  hot: true,
  debug: true
}).listen(port, host, (err, result) => {
  if (err) console.log(err);
});

console.log('-------------------------');
console.log('Local web server runs at http://' + host + ':' + port);
console.log('-------------------------');


module.exports = config
