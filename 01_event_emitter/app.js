// const EventEmitter = require("events"); // This node's events library
const EventEmitter = require("./events");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

// defined events
myEmitter.on("foo", () => {
  console.log("A event occurred 1.");
});

myEmitter.on("foo", () => {
  console.log("A event occurred 2.");
});

myEmitter.on("foo", (text) => {
  console.log("A event with a parameter occurred.");
  console.log(text);
});

// Run event once (event will be removed after the first run)
myEmitter.once("bar", () => {
  console.log("An event occurred bar.");
});

// Firing the event
myEmitter.emit("foo", "some texts");
myEmitter.emit("bar");

//The following event will not be existed
myEmitter.emit("bar");
