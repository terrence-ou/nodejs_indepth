const fs = require("fs/promises");

// commands
const CREATE_FILE = "create a file";
const DELETE_FILE = "delete the file";
const RENAME_FILE = "rename the file";
const ADD_TO_FILE = "add to the file";

/* Watching the command.txt file for changes */
(async () => {
  // function for creating a file
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

  // function for deleting a file
  const deleteFile = async (path) => {
    console.log(`Deleting ${path}...`);
    try {
      await fs.unlink(path, (error) => {
        if (error) throw error;
      });
    } catch (error) {
      console.log(`Failed to delete file ${path}`, error);
    }
  };

  // function for renaming a file
  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath, (error) => {
        if (error) throw error;
      });
    } catch (error) {
      console.log(`Failed to rename the file: `, error);
    }
    console.log(`Rename ${oldPath} to ${newPath}`);
  };

  const addToFile = (path, content) => {
    console.log(`Adding to ${path}`);
    console.log(`Content: ${content}`);
  };

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

    // create a file;
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      await createFile(filePath);
    }

    // rename file:
    // rename the file <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const separator = " to ";
      const sepIdx = command.indexOf(separator);
      const oldFilePath = command.substring(RENAME_FILE.length + 1, sepIdx);
      const newFilePath = command.substring(sepIdx + separator.length);
      renameFile(oldFilePath, newFilePath);
    }

    // delete file:
    // delete the file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      await deleteFile(filePath);
    }

    // add to file:
    // add to the file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const separator = " this content: ";
      const sepIdx = command.indexOf(separator);
      const filePath = command.substring(ADD_TO_FILE.length + 1, sepIdx);
      const content = command.substring(sepIdx + separator.length);
    }
  });

  const watcher = fs.watch("./command.txt");
  // async iterator
  for await (const event of watcher) {
    // detecting the file chenge
    if (event.eventType === "change") {
      // console.log(event); //{eventType: "...", filename: "..."}
      commandFileHandler.emit("change");
    }
  }

  commandFileHandler.close();
})();
