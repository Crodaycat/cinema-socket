import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MovieService } from '../services/movie.service';
import { MovieModalPageModule } from './movie-modal/movie-modal.module';
import { Tab2Page } from './tab2.page';

@NgModule({
  imports: [
    MovieModalPageModule,
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  exports: [],
  providers: [MovieService],
  declarations: [Tab2Page],
  entryComponents: []
})
export class Tab2PageModule {}
