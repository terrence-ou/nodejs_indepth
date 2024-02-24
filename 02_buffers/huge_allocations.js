const { Buffer } = require("buffer");

const buff = Buffer.alloc(1e9); // 1GB of memory

setInterval(() => {
  for (let i = 0; i < buff.length; i++) {
    buff[i] = 0x22;
  }
}, 5000);
