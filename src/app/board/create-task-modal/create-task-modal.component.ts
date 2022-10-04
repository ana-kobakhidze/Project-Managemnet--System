import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/tasks.service';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState} from '../../store/app.states';
import { Observable } from 'rxjs';
import { CreateStarted } from '../../store/actions/task.actions'
import { Add } from 'src/app/store/actions/loader.actions';



@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css'],
  providers: [TasksService],
})
export class CreateTaskModalComponent implements OnInit {

  newTask: Task = new Task();
  @Input() columnId: string;
  boardId: string;
  getState: Observable<any>;
  count: number = 1;
  taskDone: boolean = false;

  constructor(private taskService: TasksService,
    private activeRoute : ActivatedRoute,
    private store: Store<AppState>) {
      this.activeRoute.paramMap.subscribe( param => {
        this.boardId = param.get('id')
       });
       this.getState = this.store.select("taskState");
     }

  ngOnInit(): void {}
  taskIsDone(){
     this.taskDone = true;
  }
  onSubmit(submitedTask: Task) {
    this.count++;
    console.error(this.count);
    console.error(this.taskDone)
    this.store.dispatch(new CreateStarted(submitedTask, this.count, this.taskDone, this.boardId, this.columnId ));
    this.store.dispatch(new Add(true));
    this.getState.subscribe((state) => {
      this.newTask = state.tasks;
    
  });
  }

}
