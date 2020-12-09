import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyQuestionAnswersComponent } from './view-my-question-answers.component';

describe('ViewMyQuestionAnswersComponent', () => {
  let component: ViewMyQuestionAnswersComponent;
  let fixture: ComponentFixture<ViewMyQuestionAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyQuestionAnswersComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyQuestionAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
