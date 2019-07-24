import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import IMovie from '../../models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  onMovieSelected(movie: IMovie) {
    if (movie) {
      this.router.navigate(['movies', movie.id, 'functions'], {
        relativeTo: this.route
      });
    }
  }
}
