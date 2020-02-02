import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chapter2Component } from './chapter2.component';

describe('Chapter2Component', () => {
  let component: Chapter2Component;
  let fixture: ComponentFixture<Chapter2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chapter2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chapter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
