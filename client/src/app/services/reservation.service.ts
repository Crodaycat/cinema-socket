import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import IReservation from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  socket = io('http://localhost:80/');

  constructor() {}

  getReservations(functionId: number, cb: (data) => void) {
    this.socket.emit('get-reservations', functionId);
    this.socket.on('get-reservations', cb);
  }

  subscribeReservations(cb: (data) => void) {
    this.socket.on('created-reservation', cb);
  }

  postReservation(reservation: IReservation) {
    this.socket.emit('create-reservation', reservation);
  }
}
