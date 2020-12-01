import { Component, OnInit,ElementRef  } from '@angular/core';
import { Router } from '@angular/router';

import {Questions} from '../../model/questions.model';
import {QuestionService} from '../../service/question.service';
import {AuthorizationService} from '../../service/authorization.service';

@Component({
  selector: 'app-view-all-questions',
  templateUrl: './view-all-questions.component.html',
  styleUrls: ['./view-all-questions.component.css']
})
export class ViewAllQuestionsComponent implements OnInit {

  private isLoggedin:boolean;
  public questions:Questions[];
  public error:string;

  constructor(private questionService:QuestionService,private authorizationService:AuthorizationService,
    private router: Router,private elementRef:ElementRef) {
      this.isLoggedin=false;
      this.questions=new Array();
    }

  ngOnInit(): void {

    this.isLoggedin = this.authorizationService.isUserLoggedin();

    if(!this.isLoggedin) {
			this.router.navigate(['/login']);
		}

    let username=this.authorizationService.getLoggedinUser();

    this.questionService.getAllQuestions(username).subscribe(
     response =>{this.questions=this.questions.concat(response);},
     (error) => {
       this.error = "Either invalid credentials or something went wrong";
     });
     this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor="#8675A9";
  }

}
