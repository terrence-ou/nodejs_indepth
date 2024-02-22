const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

// defined an event
myEmitter.on("foo", () => {
  console.log("A event occurd.");
});

// Firing the event
myEmitter.emit("foo");
