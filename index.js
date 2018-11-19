'use strict';

var fs = require('fs'),
    readChunk = require('read-chunk');

module.exports.fromPath = function (path, bufferSize, callback) {
    var func = function fromPath(res, rej) {
        if (!bufferSize) {
            fs.readFile(path, function (err, buffer) {
                if (err) {
                    return rej(err);
                }
                return res(buffer);
            })
        } else {
            try {
                var buffer = readChunk.sync(path, 0, bufferSize);
                return res(buffer);
            } catch (err) {
                return rej(err);
            }
        }
    };
    return typeof callback === 'function'
        ? func(callback.bind(null, undefined), callback)
        : new Promise(func);
};

module.exports.fromPathSync = function (path, bufferSize) {
    if (!bufferSize) {
        return fs.readFileSync(path);
    }
    return readChunk.sync(path, 0, bufferSize);
};