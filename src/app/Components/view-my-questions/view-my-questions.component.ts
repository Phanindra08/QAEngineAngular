import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Questions} from '../../model/questions.model';
import {QuestionService} from '../../service/question.service';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-view-my-questions',
  styleUrls: ['./view-my-questions.component.css'],
  templateUrl: './view-my-questions.component.html',
})
export class ViewMyQuestionsComponent implements OnInit {

  public questions: Questions[];
  private isLoggedin: boolean;
  public error: string;

  constructor(private questionService: QuestionService, private tokenStorageService: TokenStorageService,
              private router: Router, private elementRef: ElementRef) {
      this.isLoggedin = false;
      this.questions = new Array();
    }

  public ngOnInit(): void {

    this.isLoggedin = this.tokenStorageService.isTokenGenerated();
    if (!this.isLoggedin) {
      this.router.navigate(['/login']);
    }

    this.questionService.getMyQuestions().subscribe(
     (response) => {this.questions = this.questions.concat(response); },
     (error) => {
       this.error = 'Either invalid credentials or something went wrong';
     });
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#8675A9';
  }

  public updateQuestion(id: number): void {
    this.router.navigate(['/edit-my-question', id]);
  }

  public deleteQuestion(id: number): void {
    this.questionService.deleteQuestion(id).subscribe((data) => {
      alert('Answer deleted Successfully');
      location.reload();
    },
    (error) => {
      alert('Either invalid credentials or something went wrong');
    });
  }

}
