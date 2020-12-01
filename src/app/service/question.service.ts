import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Questions } from '../model/Questions.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiEndPoint;

  constructor(private httpClient:HttpClient) {
    this.apiEndPoint = environment.apiEndPoint+'question/';
  }

  public addQuestion(question){
    return this.httpClient.post(this.apiEndPoint+"addQuestion",question,{responseType:"text"as"json"});
  }

  public getQuestion(id:number,username:string){
    return this.httpClient.get<Questions>(this.apiEndPoint+"viewQuestion/"+id+"/"+username);
  }

  public updateQuestion(question){
    return this.httpClient.put(this.apiEndPoint+"updateQuestion",question,{responseType:"text"as"json"});
  }

  public getAllQuestions(username:string){
    return this.httpClient.get<Questions>(this.apiEndPoint+"viewAllQuestions/"+username);
  }

  public getMyQuestions(username:string){
    return this.httpClient.get<Questions>(this.apiEndPoint+"viewMyQuestions/"+username);
  }

  public deleteQuestion(id:number){
    return this.httpClient.delete(this.apiEndPoint+"deleteQuestion/"+id);
  }

}
