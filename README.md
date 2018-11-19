# get-buffer

## Install
```
§ npm install get-buffer
```

## Usage

``` js
const getBuffer = require('get-buffer');
const fs = require('fs');
const stream = fs.createReadStream('./test.png');

getBuffer.fromStream(stream, 4100)
.then(buffer => console.error(buffer))
.catch(err => console.error(err))

getBuffer.fromPath('./test.png', 4100)
.then(buffer => console.error(buffer))
.catch(err => console.error(err))

try{
    const buffer = getBuffer.fromPathSync('./test.png', 4100);
    console.log(buffer)
}catch(err){
    console.log(err);
}
```

## API

###### fromStream(stream: `ReadStream`, bufferSize: `int` || `null`, callback: `function`)
Reads a `Buffer` from a `ReadStream`, `bufferSize` could be provided to limit the Buffer into a maximum size. Returns either a `Promise` or a `function`(callback).

###### fromPath(filePath: `string`, bufferSize: `int` || `null`, callback: `function`)
Reads a `Buffer` from a path, `bufferSize` could be provided to limit the Buffer into a maximum size. Returns either a `Promise` or a `function`(callback).

###### fromPathSync(filePath: `string`, bufferSize: `int` || `null`)
Reads a `Buffer` from a path, `bufferSize` could be provided to limit the Buffer into a maximum size. Returns synchronously.