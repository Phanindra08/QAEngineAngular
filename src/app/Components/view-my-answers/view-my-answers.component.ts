import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import {AuthorizationService} from '../../service/authorization.service';
import {Answers} from '../../model/answers.model';
import {AnswerService} from '../../service/answer.service';

@Component({
  selector: 'app-view-my-answers',
  templateUrl: './view-my-answers.component.html',
  styleUrls: ['./view-my-answers.component.css']
})
export class ViewMyAnswersComponent implements OnInit {

  public answers:Answers[];
  private isLoggedin:boolean;
  public error:string;

  constructor(private answerService:AnswerService,private authorizationService:AuthorizationService,
    private router:Router,private elementRef:ElementRef) {
    this.answers=new Array();
    this.isLoggedin=false;
  }

  ngOnInit(): void {

    this.isLoggedin = this.authorizationService.isUserLoggedin();

    if(!this.isLoggedin) {
			this.router.navigate(['/login']);
		}

    let username:string=this.authorizationService.getLoggedinUser();
    this.answerService.getMyAnswers(username).subscribe(
     (response) =>{this.answers=this.answers.concat(response);},
     (error) => {
       this.error = "Either invalid credentials or something went wrong";
     });
     this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor="#FFA62B";
  }

  public updateAnswer(id:number):void{
    this.router.navigate(['/view-answers',id]);
  }

  public deleteAnswer(id:number):void{
    this.answerService.deleteAnswer(id).subscribe((data)=> {
      alert("Answer deleted Successfully");
      location.reload();
    },
    (error) => {
      alert("Either invalid credentials or something went wrong");
    });
  }
}
