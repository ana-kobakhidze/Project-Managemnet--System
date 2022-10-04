import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Board } from './models/board.model';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  authToken: string;
  baseUrl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private activeRoute: ActivatedRoute
  ) {
    this.authToken = auth.getAuthToken();
    this.baseUrl = environment.apiUrl;
  }

  createNewBoard(model: Board): Observable<Board> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.authToken,
        'Content-Type': 'application/json',
      }),
    };

    const observable = this.http.post<Board>(
      this.baseUrl + '/boards',
      model,
      httpOptions
    );

    return observable;
  }

  setCurrentBoard(activeBoard: Board): void {
    localStorage.setItem('board-id', activeBoard.id);
  }

  getBoardId(): string {
    let urlId = '';
    this.activeRoute.paramMap.subscribe((param) => {
      urlId = param.get('id');
      return urlId;
    });
    return urlId;
  }

  getBoard(id: string): Observable<Board> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.authToken,
      }),
    };
    return this.http.get<Board>(this.baseUrl + '/boards/' + id, httpOptions);
  }

  getBoards(): Observable<Board[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.authToken,
      }),
    };
    return this.http.get<Board[]>(this.baseUrl + '/boards', httpOptions);
  }

  updateBoard(board: Board): Observable<Board> {
    const model = {
      title: board.title,
      description: board.description,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.authToken,
      }),
    };
    return this.http.put<Board>(
      this.baseUrl + '/boards/' + board.id,
      model,
      httpOptions
    );
  }

  delete(id: string): Observable<unknown> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: 'Bearer ' + this.authToken,
      }),
    };
    return this.http.delete(this.baseUrl + '/boards/' + id, httpOptions);
  }
}
