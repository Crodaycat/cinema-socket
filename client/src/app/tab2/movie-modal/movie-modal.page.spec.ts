import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieModalPage } from './movie-modal.page';

describe('MovieModalPage', () => {
  let component: MovieModalPage;
  let fixture: ComponentFixture<MovieModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
