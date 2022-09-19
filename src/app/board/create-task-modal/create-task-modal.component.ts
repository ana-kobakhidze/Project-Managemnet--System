import { Component, OnInit, Input } from '@angular/core';
import { Tasks } from 'src/app/models/tasks.model';
import { TasksService } from 'src/app/tasks.service';
import { Column } from 'src/app/models/column.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css'],
  providers: [TasksService],
})
export class CreateTaskModalComponent implements OnInit {
  newTask: Tasks = new Tasks();
  @Input() columnId: string;
  boardId: string;

  constructor(private taskService: TasksService,
    private activeRoute : ActivatedRoute) {
      this.activeRoute.paramMap.subscribe( param => {
        this.boardId = param.get('id')
       });
     }

  ngOnInit(): void {}
  onSubmit(submitedTask: Tasks) {
    this.taskService
      .createTask(submitedTask, this.columnId)
      .subscribe((response) => {
        this.newTask = response;
        localStorage.setItem('task-id', response.id);
        window.location.reload();
      });
  }
}
