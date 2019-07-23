import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import IMovie from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  socket = io('http://192.168.25.175:80/');

  constructor(private restangular: Restangular) {}

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
