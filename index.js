var httpServer = require('http'),
		app = require('./app'),
		ParseServer = require('./parse-server');

var port = app.get('port');

httpServer.createServer(app).listen(port, () => {
    console.log('E-shoper' + port + '.');
});