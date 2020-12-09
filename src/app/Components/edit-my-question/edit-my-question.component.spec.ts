import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyQuestionComponent } from './edit-my-question.component';

describe('EditMyQuestionComponent', () => {
  let component: EditMyQuestionComponent;
  let fixture: ComponentFixture<EditMyQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMyQuestionComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
