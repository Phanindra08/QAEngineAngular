import { Component, OnInit,ElementRef} from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

import {AuthorizationService} from '../../service/authorization.service';
import {Questions} from '../../model/questions.model';
import {QuestionService} from '../../service/question.service';

@Component({
  selector: 'app-edit-my-question',
  templateUrl: './edit-my-question.component.html',
  styleUrls: ['./edit-my-question.component.css']
})
export class EditMyQuestionComponent implements OnInit {

  private isLoggedin:boolean;
  public question:Questions;
  public questionsForm:FormGroup;
  private id:number;
  private username:string;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,
    private questionService:QuestionService,
    private location: Location,
    private router: Router,private authorizationService:AuthorizationService
    ,private elementRef:ElementRef
  ) {
    this.question=new Questions();
    this.isLoggedin=false;
  }

  ngOnInit(): void {

    this.isLoggedin = this.authorizationService.isUserLoggedin();

    if(!this.isLoggedin) {
			this.router.navigate(['/login']);
		}

    this.questionsForm=this.formBuilder.group({
      id: [''],
      questionnaire: ['', [Validators.required]]
    });

    this.route.paramMap.subscribe((params) => {
      this.id=+params.get('id');
      this.username=this.authorizationService.getLoggedinUser();
      this.questionService.getQuestion(this.id,this.username).subscribe(
       response =>{
         this.question = response;
         if(this.question==null){
             this.router.navigate(['/bad-request']);
             return;
         }},
       (error) => {
         alert("Either invalid credentials or something went wrong");
         this.goBack();
       });
    });
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor="#8675A9";
  }

  questionUpdate():void{
    if(this.questionsForm.valid){
      this.question.username=this.username;
      this.questionService.updateQuestion(this.question)
        .subscribe((data) => {
          alert("Question updated Successfully.");
          this.router.navigate(['/view-my-questions']);
        },
        (error) => {
          alert("Either invalid credentials or something went wrong");
          location.reload();
        });
    }
    else{
      alert('Question is not added.');
    }
  }

  public goBack():void{
    this.location.back();
  }

}
