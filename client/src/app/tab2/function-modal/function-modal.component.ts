import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import IMovieFunction from 'src/app/models/movieFunction';
import { MovieFunctionService } from 'src/app/services/movie-function.service';

@Component({
  selector: 'app-function-modal',
  templateUrl: './function-modal.component.html',
  styleUrls: ['./function-modal.component.scss']
})
export class FunctionModalComponent implements OnInit {
  @Input() movieId: number;
  movieFunctionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private movieFunctionService: MovieFunctionService
  ) {
    this.initMovieFunctionForm();
  }

  ngOnInit() {}

  initMovieFunctionForm() {
    this.movieFunctionForm = this.fb.group({
      functionTime: ['', Validators.required],
      functionDate: ['', Validators.required]
    });
  }

  saveFunction() {
    const movieFunction: IMovieFunction = this.movieFunctionForm
      .value as IMovieFunction;
    movieFunction.movieId = this.movieId;

    this.movieFunctionService.postMovieFunction(movieFunction);
  }
}
