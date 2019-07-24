import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import IReservation from 'src/app/models/reservation';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  rowsIndex: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  seatsMatrix: number[][] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private alertController: AlertController
  ) {
    for (let index = 0; index < 8; index++) {
      this.seatsMatrix.push([]);
      for (let row = 0; row < 6; row++) {
        this.seatsMatrix[index].push(1);
      }
    }

    this.getReservatedSeats();
    this.subscribeToReservations();
  }

  ngOnInit() {}

  goBackButton() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }

  async openReserveSeat(row: number, col: number) {
    const alert = await this.alertController.create({
      header: 'Reservar asiento',
      message: `¿Desea reservar el asiento <strong>${
        this.rowsIndex[row]
      }-${col + 1}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler: () => {
            const reservation: IReservation = {
              id: 0,
              movieFunctionId: this.getFunctionId(),
              reservationRow: this.rowsIndex[row],
              reservationChair: col
            };

            this.reservationService.postReservation(reservation);
          }
        }
      ]
    });

    await alert.present();
  }

  getReservatedSeats() {
    this.reservationService.getReservations(this.getFunctionId(), data => {
      if (!data) {
        return;
      }

      const reservedSeats: IReservation[] = data;

      reservedSeats.forEach(reserved => this.disableReservedChair(reserved));
    });
  }

  subscribeToReservations() {
    this.reservationService.subscribeReservations(data => {
      if (data && data.movieFunctionId === this.getFunctionId()) {
        this.disableReservedChair(data);
      }
    });
  }

  disableReservedChair(reservation: IReservation) {
    this.seatsMatrix[this.getReservationRowIndex(reservation)][
      reservation.reservationChair
    ] = 0;
  }

  getReservationRowIndex(reservation: IReservation) {
    return this.rowsIndex.findIndex(row => row === reservation.reservationRow);
  }

  getFunctionId(): number {
    return parseInt(this.route.snapshot.paramMap.get('functionId'), 10);
  }
}
