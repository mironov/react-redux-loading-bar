const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssImport = require('postcss-import')
const postcssCustomMedia = require('postcss-custom-media')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssCalc = require('postcss-calc')
const postcssColorFunction = require('postcss-color-function')
const postcssDiscardComments = require('postcss-discard-comments')
const postcssAutoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'eval',

  entry: [
    'babel-polyfill',
    './src',
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.join(__dirname, 'src'),
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!postcss-loader'
        ),
      },
    ],
  },

  postcss: function () {
    return [
      postcssImport({
        addDependencyTo: webpack,
      }),
      postcssCustomMedia,
      postcssCustomProperties,
      postcssCalc,
      postcssColorFunction,
      postcssDiscardComments,
      postcssAutoprefixer,
    ]
  },
}
