import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user?: User;

  constructor(private http: HttpClient) { }

  public insert(user: User): Observable<User> {
    let urlEndpoint: string = "http://localhost:8080/store/users/"; 
    return this.http.post<User>(urlEndpoint, user);
  }

  public getUserById(userId: number): Observable<User> {
    let urlEndpoint: string = "http://localhost:8080/store/users/" + userId;
    return this.http.get<User>(urlEndpoint);
  }

  public loginUser(nick: String, password: String): Observable<User>{
    let urlEndpoint: string = "http://localhost:8080/store/login";
    return this.http.post<User>(urlEndpoint,{nick: nick, password: password});
  }

}
