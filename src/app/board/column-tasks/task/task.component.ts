import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/tasks.service';
import { BoardService } from 'src/app/board.service';
import { ColumnsService } from 'src/app/columns.service';
import { Column } from 'src/app/models/column.model';
import { Store } from '@ngrx/store';
import { AppState} from '../../../store/app.states';
import { Observable } from 'rxjs';
import { DeleteStarted, UpdateStarted } from '../../../store/actions/task.actions';
import { ActivatedRoute } from '@angular/router';
import { Add } from 'src/app/store/actions/loader.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TasksService, BoardService, ColumnsService],
})
export class TaskComponent implements OnInit {
  getState: Observable<any>;
  @Input() task: Task;
  @Input() callback: Function;
  @Input() column: Column;
  tasks: Task[];
  boardId: string;


  constructor(
    private activeRoute : ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.activeRoute.paramMap.subscribe( param => {
      this.boardId = param.get('id')
     });
    this.getState = this.store.select("taskState");
  }

  ngOnInit(): void {

  }
  public deleteTask = ({columnId, taskId}) =>{
    this.store.dispatch(new DeleteStarted(this.boardId, columnId, taskId));
    this.store.dispatch(new Add(true));
  }


}
