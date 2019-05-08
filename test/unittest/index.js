const getBuffer = require('../../index')
const path = require('path')
const fs = require('fs')
const fileName = 'testfile.png'
const testFile = path.join(__dirname, fileName)
const testFileSize = fs.statSync(testFile).size;

const smallFileName = 'vit.png';
const smallTestFile = path.join(__dirname, smallFileName)
const smallTestFileSize = fs.statSync(smallTestFile).size;

const validate = (iBuffer, length) => {
    if (!Buffer.isBuffer(iBuffer)) throw new Error('Response is not a buffer.')
    if (iBuffer.length !== length) throw new Error('Length is not matching.')
}

describe('get-buffer', function () {
    describe('fromPath', function () {
        it('should return buffer from path', function (done) {
            const buff = getBuffer.fromPath(testFile);
            validate(buff, testFileSize);
            done()
        })
        it('should return buffer with specific size', function (done) {
            const buff = getBuffer.fromPath(testFile, 4100)
            validate(buff, 4100);
            done()
        })
        it("Should throw error 'Path is not a valid path.'", function (done) {
            try {
                const buff = getBuffer.fromPath('lel', 'asd')
                done(new Error("Should throw error 'Path is not a valid path.'"));
            } catch (err) {
                done()
            }
        })
        it("Should throw error 'bufferSize is not of type Number.'", function (done) {
            try {
                const buff = getBuffer.fromPath(testFile, 'asd')
                done(new Error("Should throw error 'bufferSize is not of type Number.'"));
            } catch (err) {
                done()
            }
        })
    })

    describe('fromStream', function () {
        /* Promise testing */
        it('should return buffer if smaller then watermark', function () {
            const fileStream = fs.createReadStream(smallTestFile)
            return getBuffer.fromStream(fileStream)
                .then((buff) => validate(buff, smallTestFileSize))
        })
        it('should return buffer from path', function () {
            const fileStream = fs.createReadStream(testFile)
            return getBuffer.fromStream(fileStream)
                .then((buff) => validate(buff, testFileSize))
        })
        it('should return buffer with specific size', function () {
            const fileStream = fs.createReadStream(testFile, { highWaterMark : 10})
            return getBuffer.fromStream(fileStream, 4100)
                .then((buff) => validate(buff, 4100))
        })
        it('should throw error when not stream as input', function (done) {
            const fileStream = fs.createReadStream(testFile)
            getBuffer.fromStream(fileStream, testFileSize + 100)
                .then((buff) => {
                    done(new Error("Should throw error 'Input streams buffer is less then required size.'"));
                })
                .catch(err => {
                    done();
                })
        })
        /* Callback testing */
        it('should return buffer from stream by callback', function (done) {
            const fileStream = fs.createReadStream(testFile, { highWaterMark : 10})
            getBuffer.fromStream(fileStream, function (err, buff) {
                if (err) return done(err)
                validate(buff, testFileSize)
                done()
            })
        })
        it('should return buffer from stream with specific size', function (done) {
            const fileStream = fs.createReadStream(testFile)
            getBuffer.fromStream(fileStream, 4100, function (err, buff) {
                if (err) return done(err)
                validate(buff, 4100)
                done()
            })
        })
        it("Should throw error 'Input streams buffer is less then required size.'", function (done) {
            const fileStream = fs.createReadStream(testFile)
            getBuffer.fromStream(fileStream, testFileSize + 100)
                .then((buff) => {
                    done(new Error("Should throw error 'Input streams buffer is less then required size.'"));
                })
                .catch(err => {
                    done();
                })
        })
        it("Should throw error 'Input is not a stream.'", function (done) {
            const fileStream = fs.createReadStream(testFile, { highWaterMark : 10})
            getBuffer.fromStream('ad')
                .then((buff) => {
                    done(new Error("Should throw error 'Input is not a stream.'"));
                })
                .catch(err => {
                    done();
                })
        })
        it("Should throw error 'bufferSize is not of type Number.'", function (done) {
            const fileStream = fs.createReadStream(testFile)
            getBuffer.fromStream('ad')
                .then((buff) => {
                    done(new Error("Should throw error 'bufferSize is not of type Number.'"));
                })
                .catch(err => {
                    done();
                })
        })
    })

    describe('fromArrayBuffer', function () {
        it('should return buffer from ArrayBuffer', function (done) {
            const fileArrayBuffer = fs.readFileSync(testFile);
            const arrayBuffer = new Uint8Array(fileArrayBuffer).buffer;
            const buff = getBuffer.fromArrayBuffer(arrayBuffer)
            validate(buff, testFileSize)
            done()
        })
        it('should return buffer from ArrayBuffer with specific size', function (done) {
            const fileArrayBuffer = fs.readFileSync(testFile);
            const arrayBuffer = new Uint8Array(fileArrayBuffer).buffer;
            const buff = getBuffer.fromArrayBuffer(arrayBuffer, 4100)
            validate(buff, 4100)
            done()
        })
        it("Should throw error 'Input is not an ArrayBuffer.'", function (done) {
            try {
                const buff = getBuffer.fromArrayBuffer(1)
                done(new Error("Should throw error 'Input is not an ArrayBuffer.'"));
            } catch (err) {
                done();
            }
        })
    })
})
