import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { MovieListComponent } from './movie-list/movie-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MovieListComponent],
  imports: [CommonModule, IonicModule],
  exports: [MovieListComponent, ReactiveFormsModule, RouterModule]
})
export class SharedModule {}
