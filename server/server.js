const WebSocket = require('ws');
const redis = require("redis");

const wsPort = 3000;

const redisClient = redis.createClient();

redisClient.subscribe('notifications');

const server = new WebSocket.Server({ port: wsPort });

server.on('connection', function connection(ws) {
  redisClient.on('message', function(channel, message) {
    console.log(message);
    ws.send(message);
  })
});

console.log('websocket server started at ws://localhost:' + wsPort);