const { Buffer } = require("buffer");

const memoryContainer = Buffer.alloc(4); // 4 bytes (32 bits)

console.log(memoryContainer[0]); // 0

memoryContainer[0] = 0xf4;
console.log(memoryContainer); // <Buffer f4 00 00 00>
console.log(memoryContainer[0]); // 244 -> in decimal

// A better way to write and read buffer
memoryContainer.writeInt8(-32, 2);
console.log(memoryContainer.readInt8(2));
console.log(memoryContainer);
console.log(memoryContainer.toString("hex"));
