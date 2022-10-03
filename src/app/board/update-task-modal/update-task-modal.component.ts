import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/tasks.service';
import { BoardService } from 'src/app/board.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { Observable } from 'rxjs';
import {
  FileAddStarted,
  UpdateStarted,
} from '../../store/actions/task.actions';
import { ActivatedRoute } from '@angular/router';
import { Add } from 'src/app/store/actions/loader.actions';
import { FileModel } from 'src/app/models/file.model';
import { FileService } from 'src/app/file.service';

@Component({
  selector: 'app-update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.css'],
  providers: [BoardService, TasksService, FileService],
})
export class UpdateTaskModalComponent implements OnInit {
  uploadedFile: File;
  getState: Observable<any>;
  updatedTask: Task = new Task();
  @Input() task: Task;
  @Input() columnId: string;
  boardId: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>,
    private fileService: FileService
  ) {
    this.activeRoute.paramMap.subscribe((param) => {
      this.boardId = param.get('id');
    });
    this.getState = this.store.select('taskState');
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.updatedTask = state.tasks.find((t: Task) => t.id === this.task.id);
      if (this.updatedTask && this.updatedTask?.files?.length > 0) {
        this.uploadedFile = new File([],this.updatedTask.files[0].filename);
      }
    });
  }
  onSubmit() {
    this.store.dispatch(new Add(true));
    if(this.uploadedFile?.size > 0){
      const fileModel = new FileModel(this.task.id, this.uploadedFile);
      this.store.dispatch(new FileAddStarted(fileModel));
    }
    this.store.dispatch(
      new UpdateStarted(this.task, this.boardId, this.columnId)
    );
  }

  onChange(event) {
    this.uploadedFile = event.target.files[0];
  }

  handleDownload(e){
    this.fileService.downloadFile(this.updatedTask.id, this.uploadedFile.name).subscribe(res =>{
      const blob = new Blob([res],{type:'application/octet-stream'});
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
      }});

  }


}
