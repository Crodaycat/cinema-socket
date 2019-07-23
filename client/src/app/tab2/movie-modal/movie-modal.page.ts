import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import IMovie from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.page.html',
  styleUrls: ['./movie-modal.page.scss']
})
export class MovieModalPage implements OnInit {
  movieForm: FormGroup;

  constructor(public fb: FormBuilder, private movieService: MovieService) {}

  ngOnInit() {
    this.createMovieForm();
  }

  createMovieForm() {
    this.movieForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  saveMovie() {
    const movie: IMovie = this.movieForm.value as IMovie;
    this.movieService.postMovie(movie);
  }
}
