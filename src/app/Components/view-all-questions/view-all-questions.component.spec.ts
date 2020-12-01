import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllQuestionsComponent } from './view-all-questions.component';

describe('ViewAllQuestionsComponent', () => {
  let component: ViewAllQuestionsComponent;
  let fixture: ComponentFixture<ViewAllQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
