import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import fetch from 'node-fetch';

const port = process.env.PORT || 4000;
const index = require('./routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  console.log('New client connected'), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const getApiAndEmit = async socket => {
  const url =
    'http://api.openweathermap.org/data/2.5/weather?q=Berlin,de&&appid=<the api key>';
  try {
    const response = await fetch(url).then(res => res.json()).then(res => res);

    socket.emit('FromAPI', response);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));
