import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieFunctionComponent } from './movie-function/movie-function.component';
import { MovieComponent } from './movie/movie.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MovieComponent },
      {
        path: 'movies/:movieId/functions',
        children: [
          { path: '', component: MovieFunctionComponent },
          { path: ':functionId', component: ReservationComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
