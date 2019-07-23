import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import IMovie from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  socket = io('http://localhost:80/');

  constructor(private restangular: Restangular) {}

  getAllMovies(): Observable<IMovie[]> {
    return this.restangular.all('movies').getList();
  }

  subscribeMovie(cb: (data) => any) {
    this.socket.connect();
    this.socket.on('created-movie', cb);
  }

  postMovie(movie: IMovie) {
    this.socket.emit('create-movie', movie);
  }
}
