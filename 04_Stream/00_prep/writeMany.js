const fs = require("node:fs/promises");

(async () => {
  console.time("writeMany");
  const fileHandler = await fs.open("test.txt", "w");

  for (let i = 0; i < 100_0000; i++) {
    fileHandler.write(` ${i} `);
  }
  console.timeEnd("writeMany");
})();
