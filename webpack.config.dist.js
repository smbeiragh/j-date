var config = require('./webpack.config.js');
var webpack = require('webpack');

config.output.filename = './dist/j-date.js';

config.plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

module.exports = config;
