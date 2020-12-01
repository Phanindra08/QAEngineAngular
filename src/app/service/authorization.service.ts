import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private loginUrl: string;

  SESSION_KEY = 'auth_user';
  private user: User;

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/processLoginForm';
    this.user = new User();
  }

  public authenticate(username: string, password: string) {
    this.user.username = username;
    this.user.password = password;
    return this.http.post(this.loginUrl, this.user, {responseType: 'text' as 'json'})
  }

  public registerInSession(username: string):void {
    sessionStorage.setItem(this.SESSION_KEY, username)
  }

  public logout():void {
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  isUserLoggedin() {
    let user = sessionStorage.getItem(this.SESSION_KEY);
    if (user === null) return false;
    return true;
  }

  getLoggedinUser() {
    let user = sessionStorage.getItem(this.SESSION_KEY);
    if (user === null) return ''
    return user
  }
}
