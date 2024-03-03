const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// connect to websocket server
const ws = new WebSocket('ws://localhost:8080');

const publicDirectory = path.join(__dirname, '..', 'frontend');


fs.watch(publicDirectory, (eventType,filename) => {
    console.log('filechange')
    ws.send('filechange');
})