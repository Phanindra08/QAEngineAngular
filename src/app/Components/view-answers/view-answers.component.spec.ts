import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnswersComponent } from './view-answers.component';

describe('ViewAnswersComponent', () => {
  let component: ViewAnswersComponent;
  let fixture: ComponentFixture<ViewAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
