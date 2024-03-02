const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const server = https.createServer();

const wss = new WebSocket.Server(server);

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('recieved: %s', message);
    })

    ws.send('something');
})

server.listen(8080)