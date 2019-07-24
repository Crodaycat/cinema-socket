import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import IMovieFunction from 'src/app/models/movieFunction';
import { MovieFunctionService } from 'src/app/services/movie-function.service';
import { ModalController } from '@ionic/angular';
import { FunctionModalComponent } from '../function-modal/function-modal.component';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.scss']
})
export class FunctionComponent implements OnInit {
  functionsDateForm: FormGroup;
  movieFunctions: IMovieFunction[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalController: ModalController,
    private movieFunctionService: MovieFunctionService
  ) {
    this.functionsDateForm = this.fb.group({
      date: [new Date().toISOString(), Validators.required]
    });
    this.subscribeToChanges();
  }

  ngOnInit() {}

  getMovieId(): number {
    return parseInt(this.route.snapshot.paramMap.get('movieId'), 10);
  }

  getFunctionFormDate(): Date {
    return this.functionsDateForm.value.date as Date;
  }

  subscribeToChanges() {
    this.movieFunctionService.subscribeMovieFunctions(data => {
      if (data && data.movieId === this.getMovieId()) {
        this.movieFunctions.unshift(data);
      }
    });
  }

  searchMovieFunctions() {
    this.movieFunctionService.getMovieFunctions(
      {
        movieId: this.getMovieId(),
        movieFunctionDate: this.getFunctionFormDate()
      },
      result => (this.movieFunctions = result || [])
    );
  }

  async openAddFunctionModal() {
    const modal = await this.modalController.create({
      component: FunctionModalComponent,
      componentProps: {
        movieId: this.getMovieId()
      }
    });

    return await modal.present();
  }
}
