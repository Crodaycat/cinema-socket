import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

import IMovie from './models/movie';
import { getMovieFunctions } from './services/movieFunctionService';
import { getMovies, postMovies } from './services/movieService';
import { getReservations } from './services/reservation';

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Accept-Language, Content-Language, Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin'
  );
  res.header('Content-Type', 'application/json');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.status(200).send('OK');
  } else {
    //move on
    next();
  }
});

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
