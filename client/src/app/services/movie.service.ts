import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import IMovie from '../models/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  socket = io(environment.apiBaseUrl);

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
