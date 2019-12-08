const express = require('express');
const webpack = require('webpack');
const config = require('../config/webpack.dev.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackhotmodulereplacement = require("webpack-hot-middleware");
var proxyMiddleware = require('http-proxy-middleware');
const open = require('opn');
const envvariables = require('../config/enviromentconstants');
const environment = process.env.NODE_ENV;
const env = envvariables[environment];
const app = express();
const router = require('../routers');
config.output.publicPath = '/';
var compiler = webpack(config);
var devmiddleware = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	watchOptions: {
		aggregateTimeout: 200,
		poll: 1000
	}
});
var hotreload = webpackhotmodulereplacement(compiler);
app.disable('x-powered-by');
app.use('/', devmiddleware);
app.use('/', hotreload);
app.use('/', router);


app.listen(env.PORT, function () {
	console.log('app listening on port'+env.PORT+'!\n');
	open("http://"+env.SERVER+env.PORT)
});