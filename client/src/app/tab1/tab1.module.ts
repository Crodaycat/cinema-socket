import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';
import { MovieComponent } from './movie/movie.component';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1.router.module';
import { MovieFunctionComponent } from './movie-function/movie-function.component';

@NgModule({
  imports: [IonicModule, CommonModule, SharedModule, Tab1PageRoutingModule],
  declarations: [Tab1Page, MovieComponent, MovieFunctionComponent]
})
export class Tab1PageModule {}
