const WebSocket = require("ws");
const fs = require("fs");
const server = new WebSocket.Server({ port: 8080 });

const file = "server/data.json";

server.on("connection", (socket) => {
  console.log("connected");
  const content = fs.readFileSync(file).toString();
  socket.send(content);

  fs.watchFile(file, (curr, prev) => {
    console.log("file changed");
    const content = fs.readFileSync(file).toString();
    socket.send(content);
  });
});
