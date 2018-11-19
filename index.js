'use strict';

const { readFile, readFileSync } = require('fs');
const { sync } = require('read-chunk');
const { Stream } = require('stream');
const { basename } = require('path');

const fromPath = (path, bufferSize, callback) => {
    if (path === basename(path)) rej(new Error('Path is not a valid path'));
    if (bufferSize && !Number.isInteger(bufferSize)) rej(new Error('bufferSize is not of type Number'));
    const func = function (res, rej) {
        if (!bufferSize) {
            readFile(path, function (err, buffer) {
                if (err) return rej(err);
                return res(buffer);
            })
        } else {
            try {
                const buffer = sync(path, 0, bufferSize);
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

const fromPathSync = (path, bufferSize) => {
    if (!bufferSize) return readFileSync(path);
    return sync(path, 0, bufferSize);
};

const fromStream = (strm, bufferSize, callback) => {
    const func = (res, rej) => {
        if (!strm instanceof Stream) rej(new Error('Input is not a stream'));
        if (bufferSize && !Number.isInteger(bufferSize)) rej(new Error('bufferSize is not of type Number'));
        let buffer = Buffer.alloc(0);
        strm
            .on('data', data => {
                const size = Number((buffer.length + data.length) - bufferSize);
                const newBuff = size < 0 ? data : data.slice(0, data.length - size);
                buffer = Buffer.concat([buffer, newBuff]);
                if (!!bufferSize && buffer.length >= bufferSize) {
                    strm.destroy();
                    return res(buffer)
                }
            })
            .on('end', () => res(buffer))
            .on('error', rej)
    }
    return typeof callback === 'function'
        ? func(callback.bind(null, undefined), callback)
        : new Promise(func);
}

module.exports = {
    fromPathSync,
    fromStream,
    fromPath
}