const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const cors = require('cors')

const app = express();

const server = http.createServer(app);
const io = socketio(server)
const users = []
io.on('connection', (socket) => {
    console.log('user connected')
    io.emit('SavanaPoint')


   socket.on('onSetUser', user => {
       let valid = true;
       for(let i in users) {
           console.log('veri: ',users[i] === user)

           if(users[i] === user) {
               valid = false
               break
           }

           if(valid) {
             return  users.push(user)
           } else {
               socket.emit('onI')
           }
       }
        users.push(user)
    })


    socket.on('onClientMsg', (msg) => {
        console.log(msg)
        io.emit('onClientMsg', msg)
    })
})
const port = process.env.PORT || 8080;
 app.use(express.static('public'))
server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
   
})