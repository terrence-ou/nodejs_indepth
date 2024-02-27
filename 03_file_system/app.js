const fs = require("fs/promises");

/* Watching the command.txt file for changes */
(async () => {
  const commandFileHandler = await fs.open("./command.txt", "r"); // a numeric file handler

  commandFileHandler.on("change", async () => {
    // get the size of the file
    const size = (await commandFileHandler.stat()).size;
    // allocate our buffer with the size of file
    const buff = Buffer.alloc(size);
    // offset location at which we want to start filling our buffer
    const offset = 0;
    // how many bytes that we want to start reading the file from
    const length = size;
    // the position that we want to start reading the file from
    const position = 0;

    // we always want to read the whole content (from the begining all the way to the end)
    const content = await commandFileHandler.read(
      buff,
      offset,
      length,
      position
    );
    console.log(content);
  });

  const watcher = fs.watch("./command.txt");
  // async iterator
  for await (const event of watcher) {
    // detecting the file chenge
    if (event.eventType === "change") {
      console.log(event); //{eventType: "...", filename: "..."}
      commandFileHandler.emit("change");
    }
  }
})();
