const { Buffer } = require("buffer");

const buffer = Buffer.alloc(1000, 0);

// bit shift
console.log(2460 >>> 1); // 1230
console.log(Buffer.poolSize >>> 1); // 4096
// Buffer.allocUnsafe(1000); // if the size is smaller than the 4096, this method will be faster

const buff = Buffer.allocUnsafeSlow(2); // this will not use node-allocated buffer
