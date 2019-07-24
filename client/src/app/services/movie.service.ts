import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import IMovie from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  socket = io('http://localhost:80/');

  constructor() {}

  getAllMovies(cb: (data) => void) {
    this.socket.emit('get-movies');
    this.socket.on('get-movies', cb);
  }

  subscribeMovie(cb: (data) => void) {
    this.socket.on('created-movie', cb);
  }

  postMovie(movie: IMovie) {
    this.socket.emit('create-movie', movie);
  }
}
