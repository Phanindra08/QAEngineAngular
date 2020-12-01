import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) {}
  //private headers= new HttpHeaders({ 'Content-Type': 'application/json' });
  //private options = new RequestOptions({ headers: headers });

  /*public getUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  public deleteUser(user) {
    return this.http.delete(this.userUrl + "/"+ user.id);
  }*/

  public createUser(user) {
    return this.httpClient.post(environment.apiEndPoint+'createAccount/',user,{responseType:"text"as"json"});
  }
}
