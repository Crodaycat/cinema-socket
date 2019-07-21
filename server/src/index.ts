import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';

import { getMovies } from './services/movieService';
import { getReservations } from './services/reservation';
import { getMovieFunctions } from './services/movieFunctionService';

const app = express();
const server = http.createServer(app);

app.get('/movies', async (req, res) => {
  res.send(await getMovies());
});

app.get('/functions', async (req, res) => {
  res.send(await getMovieFunctions());
});

app.get('/reservations', async (req, res) => {
  res.send(await getReservations());
});

server.listen(80);

const io = SocketIO(server);

io.on('connection', socket => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', data => {
    console.log(data);
  });
});
