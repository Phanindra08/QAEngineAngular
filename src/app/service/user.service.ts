import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  public createUser(user: User): Observable<object> {
    return this.httpClient.post(environment.apiEndPoint + 'createAccount', user, {responseType: 'text'as'json'});
  }

  public authenticate(username: string, password: string): Observable<any> {
    const user = new User();
    user.username = username;
    user.password = password;
    return this.httpClient.post(environment.apiEndPoint + 'processLoginForm', user, {responseType: 'text' as 'json'});
  }

  public getUserDetails(): Observable<User> {
    return this.httpClient.get<User>(environment.apiEndPoint + 'getUser');
  }

  public updateUser(user: User): Observable<object> {
    return this.httpClient.put(environment.apiEndPoint + 'updateAccount', user, {responseType: 'text'as'json'});
  }
}
