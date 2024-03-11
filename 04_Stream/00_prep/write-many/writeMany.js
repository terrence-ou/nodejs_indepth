const fs = require("node:fs");

// Execution Time: 13.233s
async function Benchmark() {
  console.time("writeMany");
  const fileHandler = await fs.promises.open("test.txt", "w");

  for (let i = 0; i < 100_0000; i++) {
    await fileHandler.write(` ${i} `);
  }
  console.timeEnd("writeMany");
}

// Execution Time: 1.674s
async function BenchmarkCallback() {
  console.time("writeMany");
  await fs.open("text.txt", "w", (error, fd) => {
    for (let i = 0; i < 100_0000; i++) {
      fs.writeSync(fd, ` ${i} `);
    }
    console.timeEnd("writeMany");
  });
}
// BenchmarkCallback();

// Execution Time: 1.607s
async function BenchmarkBuffer() {
  console.time("writeMany");
  await fs.open("text.txt", "w", (error, fd) => {
    const buff = Buffer.from(` {i} `, "utf-8");
    for (let i = 0; i < 100_0000; i++) {
      fs.writeSync(fd, buff);
    }
    console.timeEnd("writeMany");
  });
}
// BenchmarkBuffer();

// DON'T DO IT THIS WAY; IT IS ONLY FOR BENCHMARKING PURPOSE
// Execution Time: 153.257ms
async function BenchmarkStream() {
  console.time("writeMany");
  const fileHandler = await fs.promises.open("test.txt", "w");
  const stream = fileHandler.createWriteStream();
  for (let i = 0; i < 100_0000; i++) {
    const buff = Buffer.from(` {i} `, "utf-8");
    stream.write(buff);
  }
  console.timeEnd("writeMany");
}
// BenchmarkStream();

// A CORRECT WAY OF USING STREAM
async function writeStream() {
  console.time("writeMany");
  const fileHandler = await fs.promises.open("test.txt", "w");
  const stream = fileHandler.createWriteStream();

  console.log(stream.writableHighWaterMark); // => 16384

  /* Explaination */
  // 1. This process is gathering data to the memory
  // console.log(stream.writableLength); // => 0
  // const buff = Buffer.from("string");
  // stream.write(buff);
  // console.log(stream.writableLength); // => 6

  // 2. Creating a buffer
  // 8bits = 1 byte
  // 1000 bytes = 1 kilobyte
  // 1000 kilobytes = 1 megabyte
  // const buff = Buffer.alloc(16383, 10);
  // console.log(stream.write(buff)); // true
  // console.log(stream.write(Buffer.alloc(1, "a"))); // false
  //
  // stream.on("drain", () => {
  //   console.log("We are now safe to write more!");
  // }); // this event only triggered when the stream is full and it is emptied

  let i = 0;

  const writeMany = () => {
    while (i < 1_000_000) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      // This is our last write
      if (i === 1e6 - 1) {
        stream.end(buff); // finish the writing, emitts and "end" event
        return;
      }
      // If stream.write returns false, stop the loop
      if (!stream.write(buff)) break;
      i++;
    }
  };
  writeMany();
  // resume the loop once the stream's internal buffer is empty
  stream.on("drain", () => {
    writeMany();
  });
  stream.on("finish", () => {
    console.timeEnd("writeMany");
    fileHandler.close();
  });
}

writeStream();
