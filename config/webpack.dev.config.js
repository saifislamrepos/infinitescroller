const envvariables = require('../config/enviromentconstants');
const environment = process.env.NODE_ENV;
const env = envvariables[environment];
const merge = require('webpack-merge');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HotModuleReplacementPlugin = require("webpack-hot-middleware");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('../config/webpack.config.js');
const path = require('path');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var webpackConfig = merge(baseWebpackConfig, {
  output: {
    publicPath: '/',
    path: path.resolve(env.ROOT_DIR, 'dist')
  },
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(env.ROOT_DIR, 'index_tem.html'),
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ManifestPlugin()
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [{
            loader: 'style-loader/url'
          },
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader'
          },

          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ],
          plugins: ['react-hot-loader/babel', "dynamic-import-webpack", "transform-class-properties", "@babel/plugin-proposal-object-rest-spread"]
        }
      }
    ]
  }
});
webpackConfig.entry.push("react-hot-loader/patch")
webpackConfig.entry.push("webpack-hot-middleware/client?path=/__webpack_hmr&timeout=200&reload=true");
module.exports = webpackConfig;