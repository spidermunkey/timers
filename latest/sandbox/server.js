const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({server:server});

wss.on('connection', function connection(ws) {
    console.log('new client connected!');
    ws.send('Welcome new client');

    ws.on('message', function incoming(message){
        console.log('recieved %s', message);
        ws.send('Got your msg its: ' + message);
    })
})

app.get('/', (req,res) => res.send('Hello World!'));

server.listen(8080, () => console.log('Listening on port: 8080'));