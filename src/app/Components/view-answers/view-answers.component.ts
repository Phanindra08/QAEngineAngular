import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {Answers} from '../../model/answers.model';
import {Questions} from '../../model/questions.model';
import {AnswerService} from '../../service/answer.service';
import {QuestionService} from '../../service/question.service';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-view-answers',
  styleUrls: ['./view-answers.component.css'],
  templateUrl: './view-answers.component.html',
})
export class ViewAnswersComponent implements OnInit {

  private isLoggedin: boolean;
  public question: Questions;
  public answer: Answers;
  public answersForm: FormGroup;
  private id: number;
  private username: string;
  public flag: boolean;
  public answers: Answers[];
  public error: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private questionService: QuestionService, private answerService: AnswerService,
              private formBuilder: FormBuilder, private tokenStorageService: TokenStorageService,
              private location: Location, private elementRef: ElementRef) {
      this.question = new Questions();
      this.answer = new Answers();
      this.answers = new Array();
      this.isLoggedin = false;
    }

    public ngOnInit(): void {

      this.isLoggedin = this.tokenStorageService.isTokenGenerated();
      if (!this.isLoggedin) {
        this.router.navigate(['/login']);
      }

      this.answersForm = this.formBuilder.group({
        answeringQuestion: ['', [Validators.required]],
        id: [''],
      });

      this.route.paramMap.subscribe((params) => {
        this.id = +params.get('id');
        let questions: Questions[] = new Array();
        this.questionService.getAllQuestions().subscribe(
          (response) => {
            questions = questions.concat(response);
            this.question = questions.find((questionDuplicate) => questionDuplicate.id === this.id);
            if (this.question === undefined) {
              this.router.navigate(['/bad-request']);
              return;
            }
          },
          (error) => {
            alert('Either invalid credentials or something went wrong');
            this.goBack();
          });
      });

      this.answerService.getMyAnswer(this.id).subscribe(
        (response) => {
          if (response != null) {
            this.answer = response;
            this.flag = false;
          } else {this.flag = true; }
        },
        (error) => {
          alert('Either invalid credentials or something went wrong');
          this.goBack();
        });

      this.answerService.getAllAnswers(this.id).subscribe (
         (response) => {this.answers = this.answers.concat(response);
         },
         (error) => {
           this.error = 'Either invalid credentials or something went wrong';
         });
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFA62B';
    }

    public updateAnswer(): void {
      if (this.answersForm.valid) {
        this.answerService.updateAnswer(this.answer)
          .subscribe((data) => {
            alert('Answer updated Successfully.');
            this.router.navigate(['/view-my-answers']);
          },
          (error) => {
            alert('Either invalid credentials or something went wrong');
            location.reload();
          });
      } else {
        alert('Question has not been updated.');
      }
    }

    public addAnswer(): void {
      this.answer.questionDTO = this.question;
      if (this.answersForm.valid) {
        this.answerService.addAnswer(this.answer)
          .subscribe((data) => {
            alert('Answer added Successfully.');
            this.router.navigate(['/view-all-questions']);
          },
          (error) => {
            alert('Either invalid credentials or something went wrong');
            location.reload();
          });
      } else {
        alert('Answer is not added.');
      }
    }

    public deleteAnswer(id: number): void {
      this.answerService.deleteAnswer(id).subscribe((data) => {
        alert('Answer deleted Successfully');
        location.reload();
      },
      (error) => {
        alert('Either invalid credentials or something went wrong');
      });
    }

    public goBack(): void {
      this.location.back();
    }
  }
