/*
  Webpack Config

  Webpack config is a POJO (Plain Ol' Javascript
  Object) that defines the transpilation of our
  app into browser-optimized files.
*/

// Dependencies
var path = require('path');
var webpack = require('webpack');

// Webpack Config for web
module.exports = {
  entry: [
    './src/js/index.js',
    'webpack-dev-server/client?http://localhost:3000'
  ],
  devtool: 'sourcemaps',
  output: {
      path: path.join(__dirname, 'dist'),
      publicPath: 'dist',
      filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        loader: "style!css!autoprefixer"
      },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel?presets[]=react,presets[]=es2015'
      },
    ]
  }
};
