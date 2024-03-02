const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path =  require('path');

const server = http.createServer();
const wss = new WebSocket.Server({server});

wss.on('connection', (ws) => {
    console.log('Client connected');
})

const publicDirectory = path.join(__dirname, '..', 'frontend');

fs.stat(publicDirectory, (err, stats) => {
    console.log('stat')
    if (err) {
        console.error('Error:',err);
        return;
    }
    console.log('dir exist watch')
})

const watcher = fs.watch(publicDirectory, (eventType, filename) => {
    console.log(filename,eventType)
    if (eventType == 'change') {
        console.log(`File ${filename} has changed`);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('refresh');
            }
        })
    }
})

watcher.on('error', (error) => {
    console.error(`Watcher error: ${error}`);
});

const PORT = 1379;

server.listen(PORT,() => {
    console.log('livereload server is listening');
})