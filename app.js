var express      = require('express');
var path         = require('path');
var app          = express();
var passport     = require('passport');
var config       = require('./config.json');
/*
 * 載入全域變數與設定
 */
require('./Global');

/*
 * middlewares
 */
require('./middlewares')(app);

/*
 * view引擎設定,dir = project_path/views,use jade
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
/*
 *static file設定 in project_path/public and project_path/bower_components
 */
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/bower_components'));

/*
 * 設定passport function
 */
require('./config/passport')(passport, config);

/*
 * api
 */
require('./controllers')(app,passport);

/*
 * errorHandler
 */
require('./errorHandler')(app);

module.exports = app;
