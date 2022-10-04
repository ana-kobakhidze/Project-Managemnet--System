import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Boards } from './models/boards.model';
import { AuthService } from './auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  authToken: string;
  baseUrl: string;

  constructor(private http: HttpClient, 
    private auth: AuthService,
    private activeRoute : ActivatedRoute) {
    this.authToken = auth.getAuthToken();
    this.baseUrl = environment.apiUrl;

   }

  createNewBoard(model: Boards) : Observable<Boards>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.authToken,
        'Content-Type': 'application/json'
      })
    };

    const observable =  this.http
    .post<Boards>(this.baseUrl + '/boards', model, httpOptions);

    return observable;
  }

  setCurrentBoard(activeBoard: Boards) : void{
    localStorage.setItem("board-id", activeBoard.id);
  }

  getBoardId() : string {
    const storedBoardId = localStorage.getItem("boardId");
    if(!storedBoardId){
      this.activeRoute.paramMap.subscribe( param => {
        const urlId = param.get('id');
        localStorage.setItem('boardId', urlId);
        return urlId;
       })
    }
    return storedBoardId;
  }

  getBoards() : Observable<Boards[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.authToken
      })
    };
    return this.http.get<Boards[]>(this.baseUrl + '/boards', httpOptions);
  }

  delete(id: string) : Observable<unknown>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Authorization': 'Bearer ' + this.authToken
      })
    };
    return this.http.delete(this.baseUrl + '/boards/' + id, httpOptions)
  }
}
