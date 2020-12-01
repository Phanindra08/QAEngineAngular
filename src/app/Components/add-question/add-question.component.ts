import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {Questions} from '../../model/questions.model';
import {AuthorizationService} from '../../service/authorization.service';
import {QuestionService} from '../../service/question.service';

@Component({
  selector: 'app-add-question',
  styleUrls: ['./add-question.component.css'],
  templateUrl: './add-question.component.html',
})
export class AddQuestionComponent implements OnInit {

  private isLoggedin: boolean;
  public question: Questions;
  public questionsForm: FormGroup;

  constructor(private location: Location, private elementRef: ElementRef,
              private formBuilder: FormBuilder, private router: Router
              private authorizationService: AuthorizationService,
              private questionService: QuestionService) {
    this.question = new Questions();
    this.isLoggedin = false;
  }

  public ngOnInit(): void {
    this.isLoggedin = this.authorizationService.isUserLoggedin();

    if (!this.isLoggedin) {
      this.router.navigate(['/login']);
    }

    this.questionsForm = this.formBuilder.group({
      questionnaire: ['', [Validators.required]],
    });

    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#8675A9';
  }

  public addQuestion(): void {
    if (this.questionsForm.valid) {
      this.question.username = this.authorizationService.getLoggedinUser();
      this.questionService.addQuestion(this.question)
        .subscribe((data) => {
          alert('Question added Successfully.');
          this.router.navigate(['/view-my-questions']);
        },
        (error) => {
          alert('Either invalid credentials or something went wrong');
          location.reload();
        });
    } else {
      alert('Question is not added.');
    }
  }

  public goBack(): void {
    this.location.back();
  }
}
