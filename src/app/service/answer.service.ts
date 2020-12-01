import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Answers } from '../model/Answers.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private apiEndPoint;

  constructor(private httpClient:HttpClient) {
    this.apiEndPoint = environment.apiEndPoint+'answer/';
  }

  public getMyAnswer(id: number,username:string) {
    return this.httpClient.get<Answers>(this.apiEndPoint+"viewMyAnswer/"+id+"/"+username);
  }

  public getMyAnswers(username:string) {
    return this.httpClient.get<Answers>(this.apiEndPoint+"viewMyAnswers/"+username);
  }

  public addAnswer(answer:Answers){
    return this.httpClient.post(this.apiEndPoint+"addAnswer",answer,{responseType:"text"as"json"});
  }

  public updateAnswer(answer:Answers){
    return this.httpClient.put(this.apiEndPoint+"updateAnswer",answer,{responseType:"text"as"json"});
  }

  public deleteAnswer(id:number){
    return this.httpClient.delete(this.apiEndPoint+"deleteAnswer/"+id);
  }

  public getAllAnswers(id:number,username:string){
    return this.httpClient.get<Answers>(this.apiEndPoint+"viewAnswers/"+id+"/"+username);
  }

  public getMyQuestionAnswers(id:number){
    return this.httpClient.get<Answers>(this.apiEndPoint+"viewMyQuestionAnswers/"+id);
  }

  public saveRating(answer:Answers){
    return this.httpClient.put(this.apiEndPoint+"saveRatings",answer,{responseType:"text"as"json"});
  }
}
