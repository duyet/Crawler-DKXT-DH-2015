/**
 * Main thread for crawler system.
 * 
 * All module avaible for run, ignore
 * setup in config.js
 * 
 * Author: Van-Duyet Le
 * Date: 03/08/2015
 */
 
 // Load config 
var config = require('./config');

// Load module path
var modulePath = require("path").join(__dirname, 'crawler_modules');

// Scan module dir, load all for run
require("fs").readdirSync(modulePath).forEach(function(f) {
	// Ignore module from config.
	if (f.match(/^.+\.js$/g) !== null && config.global.ignoreModule.indexOf(f) == -1) {
		console.log('Loading module ' + f + '...')
		require('./' + config.global.modulesDir + '/' + f);
	}
});