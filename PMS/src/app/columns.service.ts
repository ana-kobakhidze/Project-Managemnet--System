import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Column } from './models/column.model';
import { AuthService } from './auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ColumnsService {
  boardId: string;
  authToken: string;
  baseUrl: string;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private activeRoute: ActivatedRoute
  ) {
    this.authToken = auth.getAuthToken();
    this.activeRoute.paramMap.subscribe((param) => {
      this.boardId = param.get('id');
      this.baseUrl = environment.apiUrl;
    });
  }
  createColumn(model: Column): Observable<Column> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.authToken,
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Column>(
      this.baseUrl + '/boards/' + this.boardId + '/columns',
      model,
      httpOptions
    );
  }
  getColumns(): Observable<Column[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.authToken,
      }),
    };
    return this.http.get<Column[]>(
      this.baseUrl + '/boards/' + this.boardId + '/columns',
      httpOptions
    );
  }
  getCurrentColumn(): string {
    return localStorage.getItem('column-id');
  }
  deleteColumn(columnId: string): Observable<unknown> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: 'Bearer ' + this.authToken,
      }),
    };
    return this.http.delete(
      this.baseUrl + '/boards/' + this.boardId + '/columns/' + columnId,
      httpOptions
    );
  }
  updateColumn(model: Column): Observable<Column> {
    let request = {
      title: model.title,
      order: model.order,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.authToken,
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Column>(
      this.baseUrl + '/boards/' + this.boardId + '/columns/' + model.id,
      request,
      httpOptions
    );
  }
}
