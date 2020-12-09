import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Answers} from '../../model/answers.model';
import {AnswerService} from '../../service/answer.service';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-view-my-answers',
  styleUrls: ['./view-my-answers.component.css'],
  templateUrl: './view-my-answers.component.html',
})
export class ViewMyAnswersComponent implements OnInit {

  public answers: Answers[];
  private isLoggedin: boolean;
  public error: string;

  constructor(private answerService: AnswerService, private tokenStorageService: TokenStorageService,
              private router: Router, private elementRef: ElementRef) {
    this.answers = new Array();
    this.isLoggedin = false;
  }

  public ngOnInit(): void {

    this.isLoggedin = this.tokenStorageService.isTokenGenerated();
    if (!this.isLoggedin) {
      this.router.navigate(['/login']);
    }

    this.answerService.getMyAnswers().subscribe(
     (response) => {this.answers = this.answers.concat(response); },
     (error) => {
       this.error = 'Either invalid credentials or something went wrong';
     });
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#FFA62B';
  }

  public updateAnswer(id: number): void {
    this.router.navigate(['/view-answers', id]);
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
}
