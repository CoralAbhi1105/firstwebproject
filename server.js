const express = require('express')
const { IncomingMessage } = require('http')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))
 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// socket setup

const io = require('socket.io')(http)


io.on('connection', (socket) => {
    console.log('Connected...')
})

const users = {};

io.on('connection', (socket) => {
    socket.on('New-user-joined', name1 =>{
        users[socket.id] = name1;
        socket.broadcast.emit('User-joined', name1);
    })

    socket.on('message', (msg) =>{ 
        socket.broadcast.emit('message', msg)
    })
})