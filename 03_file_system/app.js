const fs = require("fs/promises");

/* Watching the command.txt file for changes */
(async () => {
  const commandFileHandler = await fs.open("./command.txt", "r"); // a numeric file handler

  const watcher = fs.watch("./command.txt");
  // async iterator
  for await (const event of watcher) {
    // detecting the file chenge
    if (event.eventType === "change") {
      console.log(event); //{eventType: "...", filename: "..."}

      // create a buffer to save our file
      const size = (await commandFileHandler.stat()).size;
      const buff = Buffer.alloc(size);
      const offset = 0;
      const length = size;
      const position = 0;
      const content = await commandFileHandler.read(
        buff,
        offset,
        length,
        position
      );
      console.log(content);
    }
  }
})();
