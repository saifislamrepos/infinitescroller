process.env['NODE_ENV'] = 'prod';
const express = require('express');
const open = require('opn');
const path = require('path');
const app = express();
const router = require('./routers');
const envvariables = require('./config/enviromentconstants');
const environment = process.env.NODE_ENV;
const env = envvariables[environment];
app.disable('x-powered-by');
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});
app.use('/', router);
app.listen(env.PORT, function () {
	console.log('app listening on port'+env.PORT+'!\n');
	//open("http://"+env.SERVER+env.PORT)
});