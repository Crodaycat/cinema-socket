import { Component, Input, OnInit } from '@angular/core';
import IMovieFunction from 'src/app/models/movieFunction';

@Component({
  selector: 'app-function-list',
  templateUrl: './function-list.component.html',
  styleUrls: ['./function-list.component.scss']
})
export class FunctionListComponent implements OnInit {
  @Input() functions: IMovieFunction[] = [];

  constructor() {}

  ngOnInit() {}
}
