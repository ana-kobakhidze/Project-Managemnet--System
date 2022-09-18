import { Component, OnInit,Input } from '@angular/core';
import { Tasks } from 'src/app/models/tasks.model';
import { Column } from 'src/app/models/column.model';
import { TasksService } from 'src/app/tasks.service';
import { BoardsService } from 'src/app/boards.service';

@Component({
  selector: 'app-update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.css'],
  providers: [BoardsService, TasksService]
})
export class UpdateTaskModalComponent implements OnInit {
  updatedTask:Tasks = new Tasks();
  @Input() task : Tasks;

  id: string;

  constructor(private boardService : BoardsService, private taskService : TasksService) { 
   this.id = boardService.getBoardId();
  }

  ngOnInit(): void {
  }
  onSubmit(){
      this.taskService.updateTasks(this.task).subscribe(response =>{
        this.updatedTask = response;
      })
 
  }

}
