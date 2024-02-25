/* Three ways to copy a file*/

// 1. Promise API
// const fs = require("fs/promises");
// (async () => {
//   try {
//     await fs.copyFile("./test_file.txt", "./copied_promise.txt");
//   } catch (error) {
//     console.log(error);
//   }
// })();

// 2. Callback API
// const fs = require("fs");
// fs.copyFile("./test_file.txt", "./copied_callback.txt", (error) => {
//   if (error) console.log(error);
// });

// 3. Synchronous API
const fs = require("fs");
fs.copyFileSync("./test_file.txt", "copied_sync.txt");
