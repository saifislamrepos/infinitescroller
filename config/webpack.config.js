const path = require('path');
const webpack = require('webpack');
const envvariables = require('../config/enviromentconstants');
const environment = process.env.NODE_ENV;
const env = envvariables[environment];

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}
module.exports = {
	entry: [path.resolve(env.ROOT_DIR, 'src/index.js')],
	output: {
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.json','.css'],
		alias: {
			'@': resolve('src')
		}
	},
	module: {
		rules: [{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [
						'@babel/preset-react',
						'@babel/preset-env'
					]
				}
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
					plugins: [ "dynamic-import-webpack","transform-class-properties","@babel/plugin-proposal-object-rest-spread" ]
				  }
			},
			{
				test: /\.styl(us)?$/,
				use: [ 'css-loader', 'stylus-loader','sass-loader']
			}
		]
	}
};