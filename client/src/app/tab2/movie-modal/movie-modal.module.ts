import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MovieModalPage } from './movie-modal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [MovieModalPage],
  entryComponents: [MovieModalPage]
})
export class MovieModalPageModule {}
