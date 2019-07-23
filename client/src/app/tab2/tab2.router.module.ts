import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { MovieModalPage } from './movie-modal/movie-modal.page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MovieComponent },
      { path: 'movies', children: [{ path: '', component: MovieComponent }] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
