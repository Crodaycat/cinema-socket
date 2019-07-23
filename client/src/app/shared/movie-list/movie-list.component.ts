import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import IMovie from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Output() selectedMovie: EventEmitter<IMovie> = new EventEmitter();

  movies: IMovie[] = [];

  constructor(
    private movieService: MovieService,
    public modalController: ModalController
  ) {
    this.movieService.getAllMovies(data => (this.movies = data || []));

    this.movieService.subscribeMovie(data => data && this.movies.unshift(data));
  }

  ngOnInit() {}

  onMovieClick(movie: IMovie) {
    this.selectedMovie.emit(movie);
  }
}
