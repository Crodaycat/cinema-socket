import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';

import { getMovies } from './services/movieService';

const app = express();
const server = http.createServer(app);

app.get('/movies', async (req, res) => {
  res.send(await getMovies());
});

server.listen(80);

const io = SocketIO(server);

io.on('connection', socket => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', data => {
    console.log(data);
  });
});
