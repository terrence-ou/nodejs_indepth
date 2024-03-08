const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("src.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");
  const streamRead = fileHandleRead.createReadStream();
  const streamWrite = fileHandleWrite.createWriteStream();
  streamRead.on("data", (chunk) => {
    chunk.toString("utf-8").split(" ");
    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }
  }); // we're not getting all data but get multiple chuncks

  // This ensures do not stack
  streamWrite.on("drain", () => {
    streamRead.resume();
  });
})();
