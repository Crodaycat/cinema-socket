import { Component, OnInit } from '@angular/core';
import { MovieModalPage } from '../movie-modal/movie-modal.page';
import { ModalController } from '@ionic/angular';
import IMovie from 'src/app/models/movie';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  async openAddMovieModal() {
    const modal = await this.modalController.create({
      component: MovieModalPage
    });

    return await modal.present();
  }

  onMovieSelected(movie: IMovie) {
    if (movie) {
      this.router.navigate(['movies', movie.id, 'functions'], {
        relativeTo: this.route
      });
    }
  }
}
