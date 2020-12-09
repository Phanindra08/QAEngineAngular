import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Questions } from '../model/Questions.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  private apiEndPoint;

  constructor(private httpClient: HttpClient) {
    this.apiEndPoint = environment.apiEndPoint + 'question/';
  }

  public addQuestion(question: Questions): Observable<object> {
    return this.httpClient.post(this.apiEndPoint + 'addQuestion', question, {responseType: 'text'as'json'});
  }

  public getQuestion(id: number): Observable<Questions> {
    return this.httpClient.get<Questions>(this.apiEndPoint + 'viewQuestion/' + id);
  }

  public updateQuestion(question: Questions): Observable<object> {
    return this.httpClient.put(this.apiEndPoint + 'updateQuestion', question, {responseType: 'text'as'json'});
  }

  public getAllQuestions(): Observable<any> {
    return this.httpClient.get(this.apiEndPoint + 'viewAllQuestions');
  }

  public getMyQuestions(): Observable<Questions> {
    return this.httpClient.get<Questions>(this.apiEndPoint + 'viewMyQuestions');
  }

  public deleteQuestion(id: number): Observable<object> {
    return this.httpClient.delete(this.apiEndPoint + 'deleteQuestion/' + id);
  }
}
