import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MovieService } from '../services/movie.service';
import { Tab2Page } from './tab2.page';
import { SharedModule } from '../shared/shared.module';
import { MovieComponent } from './movie/movie.component';
import { Tab2PageRoutingModule } from './tab2.router.module';
import { MovieModalPage } from './movie-modal/movie-modal.page';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule
  ],
  exports: [],
  providers: [MovieService],
  declarations: [Tab2Page, MovieComponent, MovieModalPage],
  entryComponents: [MovieModalPage]
})
export class Tab2PageModule {}
