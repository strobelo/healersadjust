import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const port = 5000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path:'/websocket' });


class User {
  socket: WebSocket.WebSocket;
  name: string;
  roomName: string;

  constructor(socket: WebSocket.WebSocket, name: string, roomName: string) {
    this.socket = socket;
    this.name = name;
    this.roomName = roomName;
  }
}

type Message = {
  operation: "join" | "message";
  message: string
  sender: string
  room: string
}

class ChatRoom {
  name: string;
  members: Map<string, User> = new Map<string, User>();

  constructor(name: string) {
    this.name = name
  }

  addMember(user: User) {
    // Add a new member and save their user info / room membership to their client socket via monkey patch
    this.members.set(user.name, user);
  }

  removeMember(name: string) {
    // Remove the member from the members object
    this.members.delete(name);
  }

  sendMessage(message: Message) {
    // Send the message to each client connected to this room
    console.log(message);
    this.members.forEach((user, name) => {
      if (user.socket !== null) {
        if (user.socket.readyState === WebSocket.OPEN) {
          user.socket.send(JSON.stringify(message));
        }
      }
    })
  }
}

class ChatServer {
  rooms: Map<string, ChatRoom> = new  Map<string, ChatRoom>();

  createOrGetRoom(roomName: string) {
    if(!(roomName in chatServer.rooms)) {
      // Dynamically add new chatroom if user joins one that doesn't exist
      console.log(`Creating new room ${roomName}.`);
      chatServer.rooms.set(roomName, new ChatRoom(roomName));
    }
    return this.rooms.get(roomName);
  }

  joinRoom(user: User, roomName: string) {
    const room = this.rooms.get(roomName);
    room.addMember(user);
    // Send the users in the room a notification of the new user
    room.sendMessage({"room": room.name, "sender": "Server", "operation": "message", "message": `${user.name} has joined room ${roomName}.`})
    return room;
  }

  joinOrCreateRoom(user: User, roomName: string) {
    const room = this.createOrGetRoom(roomName);
    this.joinRoom(user, roomName);
    return room;
  }

  leaveRoom(userName: string, roomName: string) {
    const room = this.rooms.get(roomName);
    if (room !== undefined) {
      room.removeMember(userName);
    }
    room.sendMessage({"room": room.name, "sender": "Server", "operation": "message", "message": `${userName} has left room ${roomName}.`})

    // Delete empty rooms when the last user leaves
    if (Object.keys(room.members).length === 0) {
      console.log(`Deleting empty room ${roomName}.`);
      this.rooms.delete(roomName);
    }
  }

}

const chatServer = new ChatServer();

wss.on("connection", (ws, request) => {
  let user: User;
  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());
    if (message.operation === "join") {
      // Create new user object for this user
      user = new User(ws, message.sender, message.room);
      const room = chatServer.joinOrCreateRoom(user, message.room);

    } else if (message.operation === "message") {
      // Propagate the message to the clients in the room
      const room = chatServer.rooms.get(message.room);
      room.sendMessage(message)
    }
  });

  ws.on("close", (event) => {
    chatServer.leaveRoom(user.name, user.roomName);
  })
});

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Chatroom listening on HTTP/Websocket port ${port}`);
});

/**
 * Command-line interface for interacting with the chat server for debugging etc
 */
process.stdout.write("> ");
let serverUser: User = null;
process.stdin.on("data", (chunk) => {

  const line = chunk.toString().trim();
  if (line.startsWith("/")) {
    const toks = line.split(" ");
    const command = toks[0].substring(1);

    if (command === "join") {
      const roomName = toks[1];
      const serverJoinedRoom = roomName;
      serverUser = new User(null, "Server", serverJoinedRoom);
      chatServer.joinOrCreateRoom(serverUser, roomName);
    }

    else if (command === "leave") {
      if (serverUser) {
        chatServer.leaveRoom(serverUser.name, serverUser.roomName)
      } else {
        console.log("No room joined.")
      }

    }

    else if (command === "send") {
      const messageText = toks.slice(2).join(" ");
      if(serverUser.roomName !== null) {
        chatServer.rooms.get(serverUser.roomName).sendMessage({"sender": "Server", "operation": "message", "message": messageText, "room": serverUser.roomName});
      }
      else {
        console.log("Must join a room using /join first.")
      }
    }

    else if (command === "rooms") {
      console.log(chatServer.rooms);
    }
  }
  process.stdout.write("> ");
});

