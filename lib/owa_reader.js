var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var config = require('../config/config');
var stripBOM = require('./utils').stripBOM;

var DATA_DIR = config.dataDirectory;

module.exports = function(zipFileLocation, cb) {	
	var extractDir =
		path.join(DATA_DIR,
			  new Date().getTime() + '' + Math.random());

	fs.mkdir(extractDir, function(err) {
		if (err) {
			return cb(err);
		}
		var unzipCmd = 'unzip ' + zipFileLocation;
		exec(unzipCmd, {
			cwd: extractDir
		}, function(err, stdout, stderr) {
			if (err) {
				console.error('Unable to unzip ' + zipFileLocation);
				if (stdout) console.error(stdout);
				if (stderr) console.error(stderr);
				console.error(err);
				return cb(err);
			}
			readMetadata(extractDir, cb);
		});
	});
};

function readMetadata(extractDir, cb) {
	var manifestPath = path.join(extractDir, 'manifest.webapp');
	var stat = fs.statSync(manifestPath);

	fs.readFile(manifestPath, {
		encoding: 'utf8'
	},
		    function(err, data) {
			    if (err) {
				    return cb(err);
			    }
			    try {
				    var appManifest = JSON.parse(stripBOM(data));
				    if (!appManifest.name) {
					    cb(new Error('App Manifest is missing a name'));
				    }
				    // No version is okay, we'll create one based on Mongo IDs
				    cb(null, appManifest, extractDir);
			    } catch (e) {
				    return cb(e);
			    }

		    });
}