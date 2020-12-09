import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Answers } from '../model/Answers.model';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {

  private apiEndPoint;

  constructor(private httpClient: HttpClient) {
    this.apiEndPoint = environment.apiEndPoint + 'answer/';
  }

  public getMyAnswer(id: number): Observable<Answers> {
    return this.httpClient.get<Answers>(this.apiEndPoint + 'viewMyAnswer/' + id);
  }

  public getMyAnswers(): Observable<Answers> {
    return this.httpClient.get<Answers>(this.apiEndPoint + 'viewMyAnswers');
  }

  public addAnswer(answer: Answers): Observable<object> {
    return this.httpClient.post(this.apiEndPoint + 'addAnswer', answer, {responseType: 'text'as'json'});
  }

  public updateAnswer(answer: Answers): Observable<object> {
    return this.httpClient.put(this.apiEndPoint + 'updateAnswer', answer, {responseType: 'text'as'json'});
  }

  public deleteAnswer(id: number): Observable<object> {
    return this.httpClient.delete(this.apiEndPoint + 'deleteAnswer/' + id);
  }

  public getAllAnswers(id: number): Observable<Answers> {
    return this.httpClient.get<Answers>(this.apiEndPoint + 'viewAnswers/' + id);
  }

  public getMyQuestionAnswers(id: number): Observable<Answers> {
    return this.httpClient.get<Answers>(this.apiEndPoint + 'viewMyQuestionAnswers/' + id);
  }

  public saveRating(answer: Answers): Observable<object> {
    return this.httpClient.put(this.apiEndPoint + 'saveRatings', answer, {responseType: 'text'as'json'});
  }
}
