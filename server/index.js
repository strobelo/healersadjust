const { resolveObjectURL } = require("buffer");
const express = require("express");
const app = express();
const port = 5000;
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

var rooms = {}

class ChatRoom {
  constructor(name) {
    this.name = name
    this.members = {}
  }

  addMember(user) {
    // Add a new member and save their user info / room membership to their client socket via monkey patch
    user.client.username = user.name
    user.client.room = this.name
    this.members[user.name] = user
  }

  removeMember(name) {
    // Remove the member from the members object
    delete this.members[name];
  }

  sendMessage(message) {
    // Send the message to each client connected to this room
    console.log(message)
    Object.values(this.members).forEach((user) => {
      if (user.client.readyState === WebSocket.OPEN) {
        user.client.send(JSON.stringify(message));
      }
    })
  }
}

wss.on("connection", function connection(ws, request) {
  const client = ws;
  ws.on("message", function message(data, isBinary) {
    const message = JSON.parse(data); 
    if (message.operation === "join") {
      if(!(message.room in rooms)) {
        // Dynamically add new chatroom if user joins one that doesn't exist
        rooms[message.room] = new ChatRoom(message.room);
      }

      // Add the user to the room
      rooms[message.room].addMember({"name": message.sender, "client": client})
      // Send the users in the room a notification of the new user
      rooms[message.room].sendMessage({"sender": "Server", "operation": "message", "message": `${message.sender} has joined room ${message.room}.`})

    } else if (message.operation === "message") {
      // Propagate the message to the clients in the room
      rooms[message.room].sendMessage(message)
    }
  });

  ws.on("close", (event) => {
    // Remove the member who closed their connection from the room
    rooms[client.room].removeMember(client.username)
    // Send the users in the room a notification of the user who left
    rooms[client.room].sendMessage({"sender": "Server", "operation": "message", "message": `${client.username} has left room ${client.room}.`})

    // Delete empty rooms when the last user leaves
    if (Object.keys(rooms[client.room].members).length == 0) {
      delete rooms[client.room];
    }
    console.log(`Open rooms: ${Object.keys(rooms).length}`);
  })
});

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/** option 1 : separate WebSocket.Server
 * have a route thats /newroom
 *    generate a random string x
 *    creat a new websocket server with path x
 *    return x to the user
 * have a route thats like /room/{id} that creates a new websocket server
 */

/** option 2: one WebSocket.Server
 * 
 *  message = {"message": "whatever", "room": "room-id"}
 */