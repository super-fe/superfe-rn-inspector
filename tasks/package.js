/**
 * Copyright (C) 2016 baidu.com
 * package.js
 *
 * changelog
 * 2016-11-15[17:03:19]:revised
 * 2017-03-22[17:10:32]:remove react&react-native
 *
 * @author yanni4night@gmail.com
 * @version 0.2.0
 * @since 0.1.0
 */
'use strict';
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var assert = require('assert');
var semver = require('semver');
var resolve = require('resolve');
var compatibleRnVersions = require('superfe-compatible-rn-versions');
var _ = require('lodash');

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
    it('should have a "author" or "contributors"', function () {
        var checkAuthorItem = function (author) {
            assert.ok(author);
            assert.ok(_.isString(author.name) && author.name, '"name" should be non-empty string');
            assert.ok(_.isString(author.email) && author.email,
                '"email" should be non-empty string');
        };

        assert.ok(('author' in pkg) || ('contributors' in pkg), 'none of them exist');

        if ('author' in pkg) {
            assert.ok(!_.isArray(pkg.author), 'You may change "author" to "contributors"');

            switch (true) {
            case _.isPlainObject(pkg.author):
                checkAuthorItem(pkg.author);
                break;
            case _.isString(pkg.author):
                assert.ok(pkg.author, '"author" should be non-empty');
                break;
            default:
                assert.ok(false, '"author" should be a string or a plain object');
            }
        }
        if ('contributors' in pkg) {
            assert.ok(_.isArray(pkg.contributors), '"contributors" should be an array');
            pkg.contributors.forEach(checkAuthorItem);
        }

    });
    it('should have a "dependencies" in object', function () {
        assert.ok(_.isPlainObject(pkg.dependencies));
    });
    it('local "react-native" should match ' + compatibleRnVersions.join('/'), function () {
        let pkg = resolve.sync('react-native/package.json', {
            basedir: process.cwd()
        });
        if (pkg) {
            pkg = require(pkg);
            try {
                assert.ok(compatibleRnVersions.indexOf(pkg.version) > -1);
            } catch (e) {
                this.skip();
            }
        } else {
            this.skip();
        }

    });
    it('should have a "devDependencies" in object', function () {
        assert.ok(_.isPlainObject(pkg.devDependencies));
    });
    /*it('should depend on "react-native"', function () {
        assert.ok('react-native' in pkg.dependencies || 'react-native' in pkg.devDependencies);
    });
    it('should depend on "react"', function () {
        assert.ok('react' in pkg.dependencies || 'react' in pkg.devDependencies);
    });*/
});