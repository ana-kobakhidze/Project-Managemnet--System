import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState} from '../store/app.states';
import { Observable } from 'rxjs';
import { GetAllStarted,UpdateStarted } from '../store/actions/column.actions'
import { ColumnsService } from '../columns.service';
import { Column } from '../models/column.model';
import { Task } from '../models/task.model';
import { Router, ActivatedRoute } from '@angular/router';

import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Add } from '../store/actions/loader.actions';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [ColumnsService],
})
export class BoardComponent implements OnInit {
  getState: Observable<any>;
  columns: Column[] = [];
  boardId: string;
  tasks: Task[];
  allColumnIds: string[];

  constructor(
    private activeRoute : ActivatedRoute,
    private route: Router,
    private store: Store<AppState>
  ) {
    this.activeRoute.paramMap.subscribe( param => {
      this.boardId = param.get('id')
     });
     this.getState = this.store.select("columnState"); 
    this.tasks = [];
  }

  ngOnInit(): void {
    this.fetchColumns(false);
  }

  fetchColumns(isRefetch: boolean): void {
    this.store.dispatch(new GetAllStarted(this.boardId));
    this.store.dispatch(new Add(true));
    this.getState.subscribe((state) => {
        let columnsForSort = [...state.columns];
        let sorted = columnsForSort.sort((a, b) => (a.order > b.order ? 1 : -1));
        this.columns = sorted;
        this.allColumnIds = this.columns.map(column => column.id);
    });
  }
  onDrop(event: CdkDragDrop<Column[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(
        event.container.data,
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

   let movedColumn = event.container.data[event.currentIndex] 
   movedColumn.order = ++event.currentIndex;
   this.store.dispatch(new UpdateStarted(movedColumn, this.boardId));

   let swappedColumn = event.container.data[event.previousIndex];
   swappedColumn.order = ++event.previousIndex
   this.store.dispatch(new UpdateStarted(swappedColumn, this.boardId));
   this.store.dispatch(new Add(true));
   
}
goBackToBoards(){
this.route.navigateByUrl('/boards');
}

}
