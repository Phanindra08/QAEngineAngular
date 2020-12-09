import { Component, ElementRef, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

import {Questions} from '../../model/questions.model';
import {QuestionService} from '../../service/question.service';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-view-all-questions',
  styleUrls: ['./view-all-questions.component.css'],
  templateUrl: './view-all-questions.component.html',
})
export class ViewAllQuestionsComponent implements OnInit {

  private isLoggedin: boolean;
  public questions: Questions[];
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
    this.questionService.getAllQuestions().subscribe(
      (response) => {this.questions = this.questions.concat(response); },
      (error) => {
        this.error = 'Either invalid credentials or something went wrong';
      });
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#8675A9';
    }
}
