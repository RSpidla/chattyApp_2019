const express = require("express");
const WebSocket = require("ws");

const PORT = 3001;

const clients = [];
const server = express()
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

const wss = new WebSocket.Server({ server });
let counter = 0;
let userID = 0;

function getRandomColour() {
  const letters = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

wss.on("connection", ws => {
  console.log("A Client has Connected");
  userID++;
  counter++;
  console.log("Current Number of Connections:", counter);
  const newConnectionStates = JSON.stringify({
    userColour: getRandomColour(),
    userID
  });
  ws.send(newConnectionStates);
  wss.clients.forEach(function each(client) {    
    if (client.readyState === WebSocket.OPEN) {
      const numberOfClients = JSON.stringify({
        counter: counter
      });
      client.send(numberOfClients);
    }
  });
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  });
  ws.on("close", () => {
    console.log("A Client has Disconnected");
    console.log("Current Number of Connections:", counter);
    counter--;
    wss.clients.forEach(function each(client) {
      const numberOfClients = JSON.stringify({
        counter: counter
      });
      client.send(numberOfClients);
    });
  });
});