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
BenchmarkBuffer();

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
