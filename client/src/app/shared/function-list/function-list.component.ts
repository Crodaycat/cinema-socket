import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import IMovieFunction from '../../models/movieFunction';

@Component({
  selector: 'app-function-list',
  templateUrl: './function-list.component.html',
  styleUrls: ['./function-list.component.scss']
})
export class FunctionListComponent implements OnInit {
  @Input() functions: IMovieFunction[] = [];
  @Output() functionSelected: EventEmitter<IMovieFunction> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onFunctionSelected(movieFunction: IMovieFunction) {
    this.functionSelected.emit(movieFunction);
  }
}
