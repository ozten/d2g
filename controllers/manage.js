'use strict';

var os = require('os');

var passport = require('passport');
var _ = require('underscore');

var keygen = require('../lib/keygen');
var owaReader = require('../lib/owa_reader');
var Project = require('../models/project');
var User = require('../models/user');
var Version = require('../models/version');

exports.getIndex = function(req, res) {
    res.render('manage/index', {
        title: 'Dashboard',
        standalone: true
    });
};

exports.getProject = function(req, res) {
    console.log(req.params.id);
    Version.find({
        _project: req.params.id
    })
        .sort('created')
        .exec(function(err, versions) {
            console.log(err, versions);
            Project.findOne(function(err, project) {
                if (err) {
                    return res.send(500, err);
                }
                res.render('manage/project', {
                    title: project.name + ' Project',
                    project: project,
                    versions: versions,
                    standalone: false
                });
            });
        });
};

//TODO uploadApp should accept a project id
// and do either createProject or _updateProject
exports.uploadApp = function(req, res) {
    if (undefined === req.session.passport.user) {
        return res.send(401, 'You must sign in');
    }
    var userId = req.session.passport.user;
    if (!req.files || !req.files.zip || !req.files.zip.path) {
        return res.send(400, 'Bad upload');
    }
    owaReader(req.files.zip.path, function(err, projectName, version) {
        if (err) {
            console.log(err);
            console.error(err);
            return res.send(404, 'Unable to read app zip');
        }

        _createProject(projectName, userId, version, function(err, newProject, newVersion) {
            if (err) {
                console.log(err);
                console.error(err);
                return res.send(500, 'Unable to save to Mongo');
            }

            fs.mkdir(path.join(os.tmpdir(), 'd2g-signed-packages'), function(err) {
                if (err) console.log('d2g mkdir err=', err);
                var signedPackage = path.join(os.tmpdir(), 'd2g-signed-packages', newProject.id + '.zip');

                // TODO Issue#25 compare version to newVersion.version
                keygen.signAppPackage(unsignedPackage, signedPackage, function(exitCode) {
                    res.send({
                        projectName: newProject.name,
                        projectId: newProject.id,
                        versionCode: newVersion.version,
                        versionId: newVersion.id,
                        userId: newProject._user
                    });
                });

            });
            

        });
    });
};

var _createProject = function(projectName, userId, version, cb) {
    console.log(typeof userId, userId);
    var aProject = new Project({
        name: projectName,
        _user: userId
    });

    aProject.save(function(err, newProject) {
        if (err) {
            return cb(err);
        }
        if (!version) {
            version = aProject._id + '.' + new Date().getTime();
        }
        var aVersion = new Version({
            version: version,
            _project: aProject._id
        });
        aVersion.save(function(err, newVersion) {
            if (err) {
                return cb(err);
            }
            cb(null, newProject, newVersion);
        });
    });
}
