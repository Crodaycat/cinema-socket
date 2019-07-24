import { TestBed } from '@angular/core/testing';

import { MovieFunctionService } from './movie-function.service';

describe('MovieFunctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieFunctionService = TestBed.get(MovieFunctionService);
    expect(service).toBeTruthy();
  });
});
