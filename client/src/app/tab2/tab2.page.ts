import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import IMovie from '../models/movie';
import { MovieService } from '../services/movie.service';
import { MovieModalPage } from './movie-modal/movie-modal.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  movies: IMovie[] = [];

  constructor(
    private movieService: MovieService,
    public modalController: ModalController
  ) {
    this.movieService
      .getAllMovies()
      .subscribe(
        data => (this.movies = data || []),
        error => console.error(error)
      );

    this.movieService.subscribeMovie(data => data && this.movies.unshift(data));
  }

  async openMovieModal() {
    const modal = await this.modalController.create({
      component: MovieModalPage
    });

    return await modal.present();
  }
}
