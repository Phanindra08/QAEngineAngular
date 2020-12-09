import { Location } from '@angular/common';
import { Component, ElementRef, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {Answers} from '../../model/answers.model';
import {Questions} from '../../model/questions.model';
import {AnswerService} from '../../service/answer.service';
import {QuestionService} from '../../service/question.service';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-view-my-question-answers',
  styleUrls: ['./view-my-question-answers.component.css'],
  templateUrl: './view-my-question-answers.component.html',
})
export class ViewMyQuestionAnswersComponent implements OnInit {

  private id: number;
  public question: Questions;
  public answers: Answers[];
  private isLoggedin: boolean;
  public error: string;

  constructor(private questionService: QuestionService,
              private answerService: AnswerService,
              private route: ActivatedRoute, private router: Router,
              private location: Location, private tokenStorageService: TokenStorageService,
              private elementRef: ElementRef,
  ) {
    this.answers = new Array();
    this.question = new Questions();
    this.isLoggedin = false;
  }

  public ngOnInit(): void {

    this.isLoggedin = this.tokenStorageService.isTokenGenerated();
    if (!this.isLoggedin) {
      this.router.navigate(['/login']);
    }

    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id');
      this.answerService.getMyQuestionAnswers(this.id).subscribe(
        (response) => {this.answers = this.answers.concat(response);
        },
        (error) => {
          this.error = 'Either invalid credentials or something went wrong';
        });
    });

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
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFA62B';
  }

  public savingRating(answer: Answers): void {
    this.answerService.saveRating(answer).subscribe(
     (data) => {location.reload(); },
     (error) => {
       alert('Either invalid credentials or something went wrong');
       location.reload();
     });
  }

  public goBack(): void {
    this.location.back();
  }
}
