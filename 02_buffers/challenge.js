// Write 0100 1000 0110 1001 0010 0001 to memory and log them use uft-8 encoding

const { Buffer } = require("buffer");

const buff = Buffer.alloc(3);

buff[0] = 0x48;
buff[1] = 0x69;
buff[2] = 0x21;

console.log(buff);
console.log(buff.toString("utf-8"));
