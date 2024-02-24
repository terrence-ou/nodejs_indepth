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

// Other ways of creating buffer
const buff = Buffer.from([0x48, 0x69, 0x21]);
console.log(buff.toString("utf-8"));

const buff2 = Buffer.from("486921", "hex");
console.log(buff2.toString("utf-8"));

const buff3 = Buffer.from("Hi!", "utf-8");
console.log(buff3);
