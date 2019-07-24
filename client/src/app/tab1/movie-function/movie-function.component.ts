import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import IMovieFunction from '../../models/movieFunction';
import { MovieFunctionService } from '../../services/movie-function.service';

@Component({
  selector: 'app-movie-function',
  templateUrl: './movie-function.component.html',
  styleUrls: ['./movie-function.component.scss']
})
export class MovieFunctionComponent implements OnInit {
  functionsDateForm: FormGroup;
  movieFunctions: IMovieFunction[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private movieFunctionService: MovieFunctionService,
    private router: Router
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

  onMovieFunctionSelected(movieFunction: IMovieFunction) {
    if (movieFunction) {
      this.router.navigate([movieFunction.id], {
        relativeTo: this.route
      });
    }
  }
}
