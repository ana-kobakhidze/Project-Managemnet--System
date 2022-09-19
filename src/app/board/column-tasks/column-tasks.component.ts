import { Component, OnInit, Input } from '@angular/core';
import { Column } from '../../models/column.model';
import { Tasks } from '../../models/tasks.model';
import { TasksService } from '../../tasks.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-column-tasks',
  templateUrl: './column-tasks.component.html',
  styleUrls: ['./column-tasks.component.css'],
  providers: [TasksService],
})
export class ColumnTasksComponent implements OnInit {
  @Input() columnId: string;
  @Input() column : Column;
  tasks: Tasks[];
  boardId: string;
  
  draggable = {
    data: "",
    effectAllowed: "all",
    isExternal: true,
    dropEffect: "move",
    disable: false,
    handle: false
  };
  constructor(
    private taskService : TasksService,
    private activeRoute : ActivatedRoute) {
      this.activeRoute.paramMap.subscribe( param => {
        this.boardId = param.get('id')
       });
     }

  ngOnInit(): void {
    this.fetchTasks(false)

  }

  fetchTasks(isFetched:Boolean){
    this.taskService.getTasks(this.columnId).subscribe((res)=>{
      this.tasks = res.sort((a,b) => (a.order > b.order) ? 1 : -1);
    });
    if(isFetched){
      // window.location.reload();
    }
}


}
