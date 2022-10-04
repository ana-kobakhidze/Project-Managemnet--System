import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Task } from './models/task.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { AppState} from './store/app.states';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  authToken: string;
  userId: string;
  boardId: string;
  baseUrl: string;
  getState: Observable<any>;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select("authState");

    this.getState.subscribe((state) => {
      this.userId = state.user?.id
    });
    this.activeRoute.paramMap.subscribe((param) => {
      this.boardId = param.get('id');
    });
    this.baseUrl = environment.apiUrl;
  }

  createTask(model: Task, order: number, done: boolean, boardId: string, columnId : string): Observable<Task>{
    let request = {
      title: model.title,
      done: done,
      order: order,
      description: model.description,
      userId: this.userId
    }
    console.error(request);
    console.error("holly shit")
    const httpOptions ={
      headers: new HttpHeaders({
        'accept':'application/json',
        'Authorization': 'Bearer ' + this.authToken,
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<Task>(this.baseUrl + '/boards/' + boardId + '/columns/' + columnId + '/tasks', request, httpOptions)
  };
  
  getTasks(boardId: String, columnId : String ) : Observable<Task[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'accept':'application/json',
        'Authorization': 'Bearer ' + this.authToken,
      })
    };
    return this.http.get<Task[]>(this.baseUrl + '/boards/' + boardId + '/columns/' + columnId + '/tasks', httpOptions)
  };
  updateTasks(model: Task, boardId:string, columnId: string): Observable<Task>{
    let request= {
      title: model.title,
      order: model.order,
      description: model.description,
      done: model.done,
      userId: model.userId,
      boardId: model.boardId,
      columnId: model.columnId,
   
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'accept':'application/json',
        'Authorization': 'Bearer ' + this.authToken,
        'Content-Type': 'application/json',
      })
    };
  
    return this.http.put<Task>(this.baseUrl + '/boards/' + model.boardId + '/columns/' + (model.oldColumnId === "" || model.oldColumnId === undefined ? columnId : model.oldColumnId) + '/tasks/'+ model.id, request, httpOptions)
  }
  deleteTask(boardId: string, columnId: string, taskId: string): Observable<unknown>{
    const httpOptions = {
      headers: new HttpHeaders({
        'accept':'*/*',
        'Authorization': 'Bearer ' + this.authToken,
      })
    };
    return this.http.delete(this.baseUrl + '/boards/' + boardId + '/columns/' + columnId + '/tasks/'+ taskId, httpOptions)
  }


getTask(columnId: string, taskId: string): Observable<Task> {
  const httpOptions = {
    headers: new HttpHeaders({
      'accept':'application/json',
      'Authorization': 'Bearer ' + this.authToken,
    })
  };
  return this.http.get<Task>(this.baseUrl + '/boards/' + this.boardId + '/columns/' + columnId + '/tasks/'+ taskId, httpOptions)
}
}