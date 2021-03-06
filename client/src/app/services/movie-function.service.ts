import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import IMovieFunction from '../models/movieFunction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieFunctionService {
  socket = io(environment.apiBaseUrl);

  constructor() {}

  getMovieFunctions(
    filter: { movieId: number; movieFunctionDate: Date },
    cb: (data) => void
  ) {
    this.socket.emit('get-movie-functions', filter);
    this.socket.on('get-movie-functions', cb);
  }

  subscribeMovieFunctions(cb: (data) => void) {
    this.socket.on('created-movie-function', cb);
  }

  postMovieFunction(movieFunction: IMovieFunction) {
    this.socket.emit('create-movie-function', movieFunction);
  }
}
