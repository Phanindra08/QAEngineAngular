import { Location } from '@angular/common';
import { Component, ElementRef, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {Questions} from '../../model/questions.model';
import {QuestionService} from '../../service/question.service';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-edit-my-question',
  styleUrls: ['./edit-my-question.component.css'],
  templateUrl: './edit-my-question.component.html',
})
export class EditMyQuestionComponent implements OnInit {

  private isLoggedin: boolean;
  public question: Questions;
  public questionsForm: FormGroup;
  private id: number;
  private username: string;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
              private questionService: QuestionService,
              private location: Location,
              private router: Router, private tokenStorageService: TokenStorageService,
              private elementRef: ElementRef,
  ) {
    this.question = new Questions();
    this.isLoggedin = false;
  }

  public ngOnInit(): void {

    this.isLoggedin = this.tokenStorageService.isTokenGenerated();
    if (!this.isLoggedin) {
      this.router.navigate(['/login']);
    }

    this.questionsForm = this.formBuilder.group({
      id: [''],
      questionnaire: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id');
      this.questionService.getQuestion(this.id).subscribe(
       (response) => {
         this.question = response;
         if (this.question == null) {
             this.router.navigate(['/bad-request']);
             return;
         }},
       (error) => {
         alert('Either invalid credentials or something went wrong');
         this.goBack();
       });
    });
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#8675A9';
  }

  public questionUpdate(): void {
    if (this.questionsForm.valid) {
      this.questionService.updateQuestion(this.question)
        .subscribe((data) => {
          alert('Question updated Successfully.');
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
