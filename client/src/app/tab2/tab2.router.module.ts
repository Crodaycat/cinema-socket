import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FunctionComponent } from './function/function.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MovieComponent },
      {
        path: 'movies/:movieId/functions',
        children: [{ path: '', component: FunctionComponent }]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
