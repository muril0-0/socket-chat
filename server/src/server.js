const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const port = 3333;

app.get("/", (req, res) => {
  const file = path.resolve(__dirname, "index.html");
  return res.sendFile(file);
});

io.on("connection", (socket) => {
  console.log("A user connected.");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected.");
  });
});

http.listen(port, () => {
  console.log(`App connected on port ${port}.`);
});
