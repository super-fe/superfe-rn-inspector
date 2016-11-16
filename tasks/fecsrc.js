/**
 * Copyright (C) 2016 baidu.com
 * fecsrc.js
 *
 * changelog
 * 2016-11-16[09:57:20]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var assert = require('assert');
var yaml = require('js-yaml');

describe('.fecsrc', function () {
    it('should exist', function () {
        assert.ok(fs.existsSync('.fecsrc'));
    });
    it('should be a JSON/YML format', function () {
        return fs.readFileAsync('.fecsrc', {
            encoding: 'utf-8'
        }).then(function (content) {
            var loaded = false;
            try {
                JSON.parse(content);
                loaded = loaded || true;
            } catch (e) {
                // empty
            }
            try {
                yaml.safeLoad(content);
                loaded = loaded || true;
            } catch (e) {
                // empty
            }
            assert.ok(loaded);
        });
    });
});