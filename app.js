const express = require('express');
const app = express();
const path = require('path');
const socketio = require('socket.io');

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/')

const server = app.listen(PORT, () => console.log(`Sunucu portu ${PORT}`));

const io = socketio.listen(server);

io.on('connection', (socket) => {
    console.log("Socket bağlandı!");

    socket.on('mesaj', data => {
        console.log(data.mesaj);
        io.emit('mesajal', data);
    });

    socket.on('disconnect', () => console.log("Socket çıkış yaptı!"))
});
