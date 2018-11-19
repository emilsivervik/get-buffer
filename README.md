# get-buffer

## Install
```
§ npm install get-buffer
```

## Usage

``` js
getBuffer.fromPath('./test.png', 4100)
.then(buffer => {
    console.error(buffer);
})
.catch(err => {
    console.error(err);
})

getBuffer.fromPath('./test.png', 4100, (err, buffer) => {
    if(err) {
        console.error(err);
    }else{
        console.log(buffer);
    }
})

try{
    const buffer = getBuffer.fromPathSync('./test.png', 4100);
    console.log(buffer)
}catch(err){
    console.log(err);
}
```

## API

### fromPath(filePath: string, callback: function)
Returns `Buffer` with the same size as the file.

### fromPath(filePath: string, bufferSize: int, callback: function)
Returns a `Buffer` with the size of 4100 bytes.