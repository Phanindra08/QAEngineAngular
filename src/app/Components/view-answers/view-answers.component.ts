import { Component, OnInit,ElementRef  } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import {AuthorizationService} from '../../service/authorization.service';
import {Questions} from '../../model/questions.model';
import {QuestionService} from '../../service/question.service';
import {Answers} from '../../model/answers.model';
import {AnswerService} from '../../service/answer.service';

@Component({
  selector: 'app-view-answers',
  templateUrl: './view-answers.component.html',
  styleUrls: ['./view-answers.component.css']
})
export class ViewAnswersComponent implements OnInit {

  private isLoggedin:boolean;
  public question:Questions;
  public answer:Answers;
  public answersForm:FormGroup;
  private id:number;
  private username:string;
  public flag:boolean;
  public answers:Answers[];
  public error:string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private formBuilder: FormBuilder,private authorizationService:AuthorizationService,
    private location: Location,private elementRef:ElementRef) {
      this.question=new Questions();
      this.answer=new Answers();
      this.answers=new Array();
      this.isLoggedin=false;
    }

    ngOnInit(): void {

      this.isLoggedin = this.authorizationService.isUserLoggedin();

      if(!this.isLoggedin) {
  			this.router.navigate(['/login']);
  		}

      this.answersForm=this.formBuilder.group({
        id: [''],
        answeringQuestion: ['', [Validators.required]]
      });

      this.username=this.authorizationService.getLoggedinUser();

      this.route.paramMap.subscribe(params => {
        this.id=+params.get('id');
        let questions:Questions[]=new Array();
        this.questionService.getAllQuestions(this.username).subscribe(
          (response) =>{questions=questions.concat(response);
            this.question=questions.find(questionDuplicate => questionDuplicate.id==this.id);
            if(this.question===undefined){
              this.router.navigate(['/bad-request']);
              return;
            }
          },
          (error) => {
            alert("Either invalid credentials or something went wrong");
            this.goBack();
          });
      });

      this.answerService.getMyAnswer(this.id,this.username).subscribe(
        (response) =>{
          if(response!=null){
            this.answer=response;
            this.flag=false;
          }
          else{this.flag=true;}
        },
        (error) => {
          alert("Either invalid credentials or something went wrong");
          this.goBack();
        });

        this.answerService.getAllAnswers(this.id,this.username).subscribe(
         (response) =>{this.answers=this.answers.concat(response);
         },
         (error) => {
           this.error = "Either invalid credentials or something went wrong";
         });
this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor="#FFA62B";
    }

    updateAnswer():void{

      if(this.answersForm.valid){
        this.answerService.updateAnswer(this.answer)
          .subscribe((data) => {
            alert("Answer updated Successfully.");
            this.router.navigate(['/view-my-answers']);
          },
          (error) => {
            alert("Either invalid credentials or something went wrong");
            location.reload();
          });
      }
      else{
        alert('Question has not been updated.');
      }
    }

    addAnswer():void{
      this.answer.questionDTO=this.question;
      if(this.answersForm.valid){
        this.answer.username=this.username;
        this.answerService.addAnswer(this.answer)
          .subscribe((data) => {
            alert("Answer added Successfully.");
            this.router.navigate(['/view-all-questions']);
          },(error) => {
            alert("Either invalid credentials or something went wrong");
            location.reload();
          });
      }
      else{
        alert('Answer is not added.');
      }
    }

    deleteAnswer(id:number):void{
      this.answerService.deleteAnswer(id).subscribe((data) => {
        alert("Answer deleted Successfully");
        location.reload();
      },
      (error) => {
        alert("Either invalid credentials or something went wrong");
      });
    }

    public goBack():void{
      this.location.back();
    }
  }
