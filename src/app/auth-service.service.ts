import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from './models/user.model';
import { LogInResponse } from './models/login-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  signUpUser(model: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<User>(this.baseUrl + '/signup', model, httpOptions);
  }
  getUserId(): string {
    const usr = this.getUserFromLocalStorage();
    return usr.id;
  }

  logInUser(model: User): Observable<LogInResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<LogInResponse>(
      this.baseUrl + '/signin',
      model,
      httpOptions
    );
  }

  getAuthToken(): string {
    return localStorage.getItem('token');
  }

  getUser(): Observable<User> {
    const user = this.getUserFromLocalStorage();
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + user.token,
      }),
    };
    return this.http.get<User>(this.baseUrl + '/users/' + user.id, httpOptions);
  }

  getUserFromLocalStorage() {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const usr = helper.decodeToken(token);
    const usrModel = {
      id: usr.userId,
      login: usr.login,
      token: token,
    };
    return usrModel;
  }

  updateUser(model: User): Observable<User> {
    const userId = this.getUserId();
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<User>(
      this.baseUrl + '/users/' + userId,
      model,
      httpOptions
    );
  }

  deleteUser(): Observable<unknown> {
    const usr = this.getUserFromLocalStorage();
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: 'Bearer ' + usr.token,
      }),
    };
    return this.http.delete(this.baseUrl + '/users/' + usr.id, httpOptions);
  }
}
