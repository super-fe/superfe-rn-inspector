/**
 * Copyright (C) 2016 baidu.com
 * package.js
 *
 * changelog
 * 2016-11-15[17:03:19]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';
var assert = require('assert');
var Promise = require('bluebird');
var semver = require('semver');
var yaml = require('js-yaml');
var editorconfig = require('editorconfig');
var compatibleRnVersions = require('superfe-compatible-rn-versions');
var _ = require('lodash');
var fs = Promise.promisifyAll(require('fs'));

describe('README.md', function () {
    it('should exist', function () {
        assert.ok(fs.existsSync('README.md'));
    });
});
describe('CHANGELOG.md', function () {
    it('should exist', function () {
        assert.ok(fs.existsSync('CHANGELOG.md'));
    });
    it('should have a "[Unreleased]" block', function () {
        return fs.readFileAsync('CHANGELOG.md', {
            encoding: 'utf-8'
        }).then(function (content) {
            assert.ok(content.indexOf('[Unreleased]') > -1);
            assert.ok(content.indexOf('[Unreleased]') !== content.lastIndexOf('[Unreleased]'));
        });
    });
});
describe('package.json', function () {
    it('should exist', function () {
        assert.ok(fs.existsSync('package.json'));
    });
    var pkg;
    it('should be a JSON format', function () {
        return fs.readFileAsync('package.json', {
            encoding: 'utf-8'
        }).then(function (content) {
            return (pkg = JSON.parse(content));
        });
    });
    it('should have a "name" in string', function () {
        assert.ok(_.isString(pkg.name));
        assert.ok(_.trim(pkg.name).length > 0);
    });
    it('should have a valid version', function () {
        assert.ok(semver.valid(pkg.version));
    });
    it('should have a "private=true"', function () {
        assert.deepEqual(pkg.private, true);
    });
    it('should have a "scripts" in object', function () {
        assert.ok(_.isPlainObject(pkg.scripts));
    });
    it('should have a "scripts.test" in string', function () {
        assert.ok(_.isString(pkg.scripts.test));
        assert.ok(_.trim(pkg.scripts.test).length > 0);
    });
    it('should have a "pre-commit" in string', function () {
        assert.ok(_.isString(pkg['pre-commit']));
        assert.ok(_.trim(pkg['pre-commit']).length > 0);
    });
    it('value of "pre-commit" should be in "scripts"', function () {
        assert.ok(pkg['pre-commit'] in pkg.scripts);
    });
    it('should have a "author" in object', function () {
        assert.ok(_.isPlainObject(pkg.author));
    });
    it('should have a "author.author.name" in string', function () {
        assert.ok(_.isString(pkg.author.name));
        assert.ok(_.trim(pkg.author.name).length > 0);
    });
    it('should have a "author.author.email" in string', function () {
        assert.ok(_.isString(pkg.author.email));
        assert.ok(_.trim(pkg.author.email).length > 0);
    });
    it('should have a "dependencies" in object', function () {
        assert.ok(_.isPlainObject(pkg.dependencies));
    });
    it('should depend on "react-native"', function () {
        assert.ok('react-native' in pkg.dependencies);
    });
    it('version of "react-native" should one of [' + compatibleRnVersions.join() + ']', function () {
        assert.ok(compatibleRnVersions.indexOf(pkg.dependencies['react-native']) > -1);
    });
    it('should have a "devDependencies" in object', function () {
        assert.ok(_.isPlainObject(pkg.devDependencies));
    });
});
describe('.editorconfig', function () {
    it('should exist', function () {
        assert.ok(fs.existsSync('.editorconfig'));
    });
    it('should format correctly', function () {
        return editorconfig.parse('.editorconfig');
    });
});
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
describe('src', function () {
    it('should exist', function () {
        assert.ok(fs.existsSync('src'));
    });
    it('should be a directory', function () {
        return fs.statAsync('src').then(function (stat) {
            assert.ok(stat.isDirectory());
        });
    });
});