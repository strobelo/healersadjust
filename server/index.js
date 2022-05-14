const express = require("express");
const app = express();
const port = 3000;
const http = require('http');
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server:server, path:'/websocket' });

/**
 * Basic Sending/Receing Text Data
 */
// wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });

//   ws.send('hello');
// });

/**
 * Broadcasting to all clients including itself
 */
wss.on("connection", function connection(ws) {
  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
