import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FileModel } from './models/file.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  file: File;
  authToken: string;
  baseUrl: string;
  boardId: string;
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private activeRoute: ActivatedRoute
  ) {
    this.authToken = auth.getAuthToken();
    this.baseUrl = environment.apiUrl;
    this.activeRoute.paramMap.subscribe((param) => {
      this.boardId = param.get('id');
    });
  }
  uploadFile(fileModel: FileModel): Observable<any> {
    const formData = new FormData();
    formData.append('taskId', fileModel.taskId);
    formData.append('file', fileModel.file, fileModel.file.name);
    return this.http.post(this.baseUrl + '/file', formData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authToken,
      }),
      responseType: 'text',
    });
  }

  downloadFile(taskId: string, filename: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        Authorization: 'Bearer ' + this.authToken,
        'content-type': 'application/octet-stream',
        responseType: 'blob',
      }),
    };
    return this.http.request(
      'GET',
      this.baseUrl + '/file/' + taskId + '/' + filename,
      { responseType: 'arraybuffer' }
    );
  }
}
