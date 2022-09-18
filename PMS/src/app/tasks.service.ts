import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth-service.service';
import { Tasks } from './models/tasks.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  authToken: string;
  userId: string;
  boardId: string;
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private activeRoute: ActivatedRoute
  ) {
    this.authToken = auth.getAuthToken();
    auth.getUser().subscribe(usr=>{
      this.userId = usr.id;
    });
    this.activeRoute.paramMap.subscribe((param) => {
      this.boardId = param.get('id');
    });
    this.baseUrl = environment.apiUrl;
  }

  createTask(model: Tasks, columnId : string): Observable<Tasks>{
    let request = {
      title: model.title,
      description: model.description,
      userId: this.userId
    }
    const httpOptions ={
      headers: new HttpHeaders({
        'accept':'application/json',
        'Authorization': 'Bearer ' + this.authToken,
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<Tasks>(this.baseUrl + '/boards/' + this.boardId + '/columns/' + columnId + '/tasks', request, httpOptions)
  };
  
  getTasks(columnId : String) : Observable<Tasks[]>{
    const httpOptions ={
      headers: new HttpHeaders({
        'accept':'application/json',
        'Authorization': 'Bearer ' + this.authToken,
      })
    };
    return this.http.get<Tasks[]>(this.baseUrl + '/boards/' + this.boardId + '/columns/' + columnId + '/tasks', httpOptions)
  };
  updateTasks(model: Tasks, columnId?:string): Observable<Tasks>{
    let request = {
      title: model.title,
      order: model.order,
      description: model.description,
      userId: model.userId,
      boardId: model.boardId,
      columnId: model.columnId
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'accept':'application/json',
        'Authorization': 'Bearer ' + this.authToken,
        'Content-Type': 'application/json',
      })
    };
    const colId = !columnId ? model.columnId : columnId;
    return this.http.put<Tasks>(this.baseUrl + '/boards/' + model.boardId + '/columns/' + colId + '/tasks/'+ model.id, request, httpOptions)
  }
  deleteTask(columnId: string, taskId: string): Observable<unknown>{
    const httpOptions = {
      headers: new HttpHeaders({
        'accept':'*/*',
        'Authorization': 'Bearer ' + this.authToken,
      })
    };
    return this.http.delete(this.baseUrl + '/boards/' + this.boardId + '/columns/' + columnId + '/tasks/'+ taskId, httpOptions)
  }
}
