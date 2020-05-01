const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//conectandome a la base de datos
mongoose.connect('mongodb://localhost/chat-database')
.then(db => console.log('db is connected'))
.catch(err = console.log('err'));

//configuracion del puerto
app.set('port', process.env.PORT || 3000);


require('./sockets')(io);
//enviando archivos estaticos

app.use(express.static(path.join(__dirname,'public' ))); 

//empieza el servidor

server.listen(app.get('port'),  () =>{
    console.log('server on port ',app.get('port'));
});