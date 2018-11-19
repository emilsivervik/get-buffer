const assert = require('assert');
const getBuffer = require('../../index');
const path = require('path');
const fileName = 'testfile.png';
const testfile = path.join(__dirname, fileName);
const fs = require('fs');

describe('get-buffer', function () {
    describe('fromPath, Promise', function () {
        it('should return buffer from path', function () {
            return getBuffer.fromPath(testfile)
                .then(function (buff) {
                    if (!Buffer.isBuffer(buff)) throw new Error('Response is not a buffer.')
                })
        });
        it('should return buffer with specific size', function () {
            return getBuffer.fromPath(testfile, 4100)
                .then(function (buff) {
                    if (!Buffer.isBuffer(buff)) throw new Error('Response is not a buffer.');
                    if (buff.length !== 4100) throw new Error('Buffer is the wrong size.');
                })
        });
    });
    describe('fromPath, Callback', function () {
        it('should return buffer from path', function (done) {
            getBuffer.fromPath(testfile, null, function (err, buff) {
                if (err) return done(err)
                if (!Buffer.isBuffer(buff)) throw new Error('Response is not a buffer.');
                done();
            })
        });
        it('should return buffer with specific size', function (done) {
            return getBuffer.fromPath(testfile, 4100, function (err, buff) {
                if (err) return done(err)
                if (!Buffer.isBuffer(buff)) throw new Error('Response is not a buffer.');
                if (buff.length !== 4100) throw new Error('Buffer is the wrong size.');
                done();
            })
        });
    });
    describe('fromPathSync', function () {
        it('should return buffer from path', function (done) {
            const buff = getBuffer.fromPathSync(testfile)
            if (!Buffer.isBuffer(buff)) throw new Error('Response is not a buffer.');
            done();
        });
        it('should return buffer with specific size', function (done) {
            const buff = getBuffer.fromPathSync(testfile, 4100)
            if (!Buffer.isBuffer(buff)) throw new Error('Response is not a buffer.');
            if (buff.length !== 4100) throw new Error('Buffer is the wrong size.');
            done();
        });
    });

    describe('fromStream, Promise', function () {
        it('should return buffer from path', function () {
            const fileStream = fs.createReadStream(testfile);
            return getBuffer.fromStream(fileStream)
                .then(function (buff) {
                    if (!Buffer.isBuffer(buff)) throw new Error('Response is not a buffer.')
                })
        });
        it('should return buffer with specific size', function () {
            const fileStream = fs.createReadStream(testfile);
            return getBuffer.fromStream(fileStream, 4100)
                .then(function (buff) {
                    if (!Buffer.isBuffer(buff)) throw new Error('Response is not a buffer.');
                    if (buff.length !== 4100) throw new Error('Buffer is the wrong size.');
                })
        });
    });

    describe('fromStream, Callback', function () {
        it('should return buffer from stream by callback', function (done) {
            const fileStream = fs.createReadStream(testfile);
            getBuffer.fromStream(fileStream, null, function (err, buff) {
                if (err) return done(err)
                if (!Buffer.isBuffer(buff)) throw new Error('Response is not a buffer.');
                done();
            })
        });
        it('should return buffer from stream with specific size', function (done) {
            const fileStream = fs.createReadStream(testfile);
            return getBuffer.fromStream(fileStream, 4100, function (err, buff) {
                if (err) return done(err)
                if (!Buffer.isBuffer(buff)) throw new Error('Response is not a buffer.');
                if (buff.length !== 4100) throw new Error('Buffer is the wrong size.');
                done();
            })
        });
    });
});