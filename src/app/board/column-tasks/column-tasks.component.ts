import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState} from '../../store/app.states';
import { Observable } from 'rxjs';
import { GetAllStarted, UpdateStarted } from '../../store/actions/task.actions'
import { Column } from '../../models/column.model';
import { Task } from '../../models/task.model';
import { TasksService } from '../../tasks.service';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Add } from 'src/app/store/actions/loader.actions';

@Component({
  selector: 'app-column-tasks',
  templateUrl: './column-tasks.component.html',
  styleUrls: ['./column-tasks.component.css'],
  providers: [TasksService],
})
export class ColumnTasksComponent implements OnInit {
  @Input() columnId: string;
  @Input() column: Column;
  @Input() allColumnIds: string[];
  getState: Observable<any>;
  tasks: Task[];
  boardId: string;
  reorderedTask: Task ;


  constructor(
    private activeRoute : ActivatedRoute,
    private store: Store<AppState>) {
      this.activeRoute.paramMap.subscribe( param => {
        this.boardId = param.get('id')
       });
       this.getState = this.store.select("taskState"); 
     }

  ngOnInit(): void {
    this.store.dispatch(new GetAllStarted(this.boardId, this.columnId));
    this.store.dispatch(new Add(true));
    this.getState.subscribe((state) => {
      this.tasks = state.tasks.filter(st => st.columnId === this.columnId).sort((a,b) => (a.order > b.order) ? 1 : -1);
        
    });

  }

getAllColumnIds() {
 let a = "[";
 this.allColumnIds.forEach((element, index) => {
  a += "'"+element+"'"+ (index + 1 === this.allColumnIds.length ? '' : ',' )
 });
 a= a +"]";
  return JSON.stringify(this.allColumnIds);
}

onDrop(event: CdkDragDrop<Task[]>){
  if(event.previousContainer === event.container){
    moveItemInArray(event.container.data,
      event.previousIndex,
      event.currentIndex 
      );
  }else{
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex, 
      event.currentIndex
    )
  }
  let reordered = event.container.data.find((item : any) => item.columnId !== this.columnId);
  reordered.columnId = this.columnId;
  reordered.oldColumnId = event.previousContainer.data[0].columnId;
  this.store.dispatch(new UpdateStarted(reordered, this.boardId, this.columnId));
  this.store.dispatch(new Add(true));
}
}
