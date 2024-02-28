const fs = require("fs/promises");

/* Watching the command.txt file for changes */
(async () => {
  const createFile = async (path) => {
    try {
      // checking whether or not we already have the file
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();
      // we already have the file
      return console.log(`The file ${path} already exists.`);
    } catch (error) {
      // If we don't have the file, now we should create one
      const newFileHandle = await fs.open(path, "w");
      console.log("A new file was successfully created.");
      newFileHandle.close();
    }
  };

  // commands
  const CREATE_FILE = "create a file";

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
    await commandFileHandler.read(buff, offset, length, position);
    const command = buff.toString("utf-8");

    // create a file
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      await createFile(filePath);
    }
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

  commandFileHandler.close();
})();
