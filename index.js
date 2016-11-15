/**
 * Copyright (C) 2016 baidu.com
 * index.js
 *
 * changelog
 * 2016-11-15[17:21:36]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';
var glob = require('glob');
var Mocha = require('mocha');

function bootstrap(cwd) {
    cwd = cwd || process.cwd();
    var mocha = new Mocha();
    glob('tasks/*.js', {
        cwd: __dirname
    }, function (err, files) {
        if (err) {
            process.exit(-1);
        }


        files.forEach(function (file) {
            mocha.addFile(__dirname + '/' + file)
        });

        mocha.run(function (failures) {
            process.on('exit', function () {
                process.exit(failures);
            });
        });
    });
}


module.exports = bootstrap;