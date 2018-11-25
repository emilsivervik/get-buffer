const getBuffer = require('../../index')
const path = require('path')
const fileName = 'testfile.png'
const testfile = path.join(__dirname, fileName)
const fs = require('fs')

const validate = (iBuffer, length) => {
    if (!Buffer.isBuffer(iBuffer)) throw new Error('Response is not a buffer.')
    if (iBuffer.length !== length) throw new Error('Length is not matching.')
}

describe('get-buffer', function () {
    describe('fromPath', function () {
        it('should return buffer from path', function (done) {
            const buff = getBuffer.fromPath(testfile);
            validate(buff, 102910);
            done()
        })
        it('should return buffer with specific size', function (done) {
            const buff = getBuffer.fromPath(testfile, 4100)
            validate(buff, 4100);
            done()
        })
    })

    describe('fromStream, Promise', function () {
        it('should return buffer from path', function () {
            const fileS = fs.createReadStream(testfile)
            return getBuffer.fromStream(fileS)
                .then((buff) => validate(buff, 102910))
        })
        it('should return buffer with specific size', function () {
            const fileS = fs.createReadStream(testfile)
            return getBuffer.fromStream(fileS, 4100)
                .then((buff) => validate(buff, 4100))
        })
    })

    describe('fromStream, Callback', function () {
        it('should return buffer from stream by callback', function (done) {
            const fileStream = fs.createReadStream(testfile)
            getBuffer.fromStream(fileStream, function (err, buff) {
                if (err) return done(err)
                validate(buff, 102910)
                done()
            })
        })
        it('should return buffer from stream with specific size', function (done) {
            const fileStream = fs.createReadStream(testfile)
            return getBuffer.fromStream(fileStream, 4100, function (err, buff) {
                if (err) return done(err)
                validate(buff, 4100)
                done()
            })
        })
    })

    describe('fromArrayBuffer', function () {
        it('should return buffer from path', function (done) {
            const arrayBuffer = new ArrayBuffer(8);
            const buff = getBuffer.fromArrayBuffer(arrayBuffer)
            validate(buff, 8)
            done()
        })
        it('should return buffer with specific size', function (done) {
            const buff = getBuffer.fromPath(testfile, 4100)
            validate(buff, 4100)
            done()
        })
    })
})
