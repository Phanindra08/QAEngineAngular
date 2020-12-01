import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import {AuthorizationService} from '../../service/authorization.service';
import {Questions} from '../../model/questions.model';
import {QuestionService} from '../../service/question.service';

@Component({
  selector: 'app-view-my-questions',
  templateUrl: './view-my-questions.component.html',
  styleUrls: ['./view-my-questions.component.css']
})
export class ViewMyQuestionsComponent implements OnInit {

  public questions:Questions[];
  private isLoggedin:boolean;
  public error:string;

  constructor(private questionService:QuestionService,private authorizationService:AuthorizationService,
    private router:Router,private elementRef:ElementRef) {
      this.isLoggedin=false;
      this.questions=new Array();
    }

  ngOnInit(): void {

    this.isLoggedin = this.authorizationService.isUserLoggedin();

    if(!this.isLoggedin) {
			this.router.navigate(['/login']);
		}

    let username:string = this.authorizationService.getLoggedinUser();
    this.questionService.getMyQuestions(username).subscribe(
     (response) =>{this.questions=this.questions.concat(response);},
     (error) => {
       this.error = "Either invalid credentials or something went wrong";
     });
     this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor="#8675A9";
  }

  public updateQuestion(id:number):void{
    this.router.navigate(['/edit-my-question',id]);
  }

  public deleteQuestion(id:number):void{
    this.questionService.deleteQuestion(id).subscribe((data) => {
      alert("Answer deleted Successfully");
      location.reload();
    },
    (error) => {
      alert("Either invalid credentials or something went wrong");
    });
  }

}
