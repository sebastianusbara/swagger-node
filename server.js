const loopback = require('loopback');
const boot = require('loopback-boot');
const useragent = require('useragent');
const routes = require('./routes');

process.on("unhandledRejection", function(error, promise){
	console.log(error);
});

var app = module.exports = loopback();

app.use(function (req, res, next) {
	let ua = useragent.parse(req.headers['user-agent'])
	req.useragent = ua;
	next();
});

app.use(routes);


app.start = function() {
	// start the web server
	return app.listen(function() {
		app.emit('started');
		var baseUrl = app.get('url').replace(/\/$/, '');
		console.log('Web server listening at: %s', baseUrl);
		if (app.get('loopback-component-explorer')) {
			var explorerPath = app.get('loopback-component-explorer').mountPath;
			console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
		}
	});
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
	if (err) throw err;

	// start the server if `$ node server.js`
	if (require.main === module)
		app.start();
});
