import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MovieService } from '../services/movie.service';
import { SharedModule } from '../shared/shared.module';
import { FunctionModalComponent } from './function-modal/function-modal.component';
import { FunctionComponent } from './function/function.component';
import { MovieModalPage } from './movie-modal/movie-modal.page';
import { MovieComponent } from './movie/movie.component';
import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2.router.module';

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
  declarations: [
    Tab2Page,
    FunctionComponent,
    MovieComponent,
    MovieModalPage,
    FunctionModalComponent
  ],
  entryComponents: [MovieModalPage, FunctionModalComponent]
})
export class Tab2PageModule {}
