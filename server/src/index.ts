import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

import IMovie from './models/movie';
import {
  getMovieFunctions,
  postMovieFunction
} from './services/movieFunctionService';
import { getMovies, postMovies } from './services/movieService';
import { getReservations, postReservation } from './services/reservation';

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

server.listen(80);

const io = SocketIO(server);

io.on('connection', socket => {
  socket.on('get-movies', async data => {
    socket.emit('get-movies', await getMovies());
  });

  socket.on('create-movie', async data => {
    const movie: IMovie = data;
    io.emit('created-movie', await postMovies(movie));
  });

  socket.on('get-movie-functions', async data => {
    socket.emit(
      'get-movie-functions',
      await getMovieFunctions(data.movieId, data.movieFunctionDate)
    );
  });

  socket.on('create-movie-function', async data => {
    io.emit('created-movie-function', await postMovieFunction(data));
  });

  socket.on('get-reservations', async data => {
    socket.emit('get-reservations', await getReservations(data));
  });

  socket.on('create-reservation', async data => {
    console.log(data);
    io.emit('created-reservation', await postReservation(data));
  });
});
