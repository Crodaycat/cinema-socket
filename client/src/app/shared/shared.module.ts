import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FunctionListComponent } from './function-list/function-list.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { ReservationService } from '../services/reservation.service';
import { MovieService } from '../services/movie.service';

@NgModule({
  declarations: [MovieListComponent, FunctionListComponent],
  imports: [CommonModule, IonicModule],
  exports: [
    FunctionListComponent,
    MovieListComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [MovieService, ReservationService]
})
export class SharedModule {}
