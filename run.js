var config = require('./config');

var modulePath = require("path").join(__dirname, 'crawler_modules');
require("fs").readdirSync(modulePath).forEach(function(f) {
	if (f.match(/^.+\.js$/g) !== null && config.global.ignoreModule.indexOf(f) == -1) {
		console.log('Loading module ' + f + '...')
		require('./' + config.global.modulesDir + '/' + f);
	}
});