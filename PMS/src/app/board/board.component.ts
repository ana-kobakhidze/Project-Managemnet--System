import { Component, OnInit, Input } from '@angular/core';
import { ColumnsService } from '../columns.service';
import { Column } from '../models/column.model';
import { BoardsService } from '../boards.service';
import { Tasks } from '../models/tasks.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [ColumnsService],
})
export class BoardComponent implements OnInit {
  columns: Column[] = [];
  boardId: string;
  tasks: Tasks[];

  constructor(
    private columnsService: ColumnsService,
    private activeRoute : ActivatedRoute
  ) {
    this.activeRoute.paramMap.subscribe( param => {
      this.boardId = param.get('id')
     });

    this.tasks = [];
  }

  ngOnInit(): void {
    this.fetchColumns(false);
  }

  fetchColumns(isRefetch: boolean): void {
    this.columnsService.getColumns().subscribe((response) => {
      this.columns = response.sort((a, b) => (a.order > b.order ? 1 : -1));
      if(isRefetch){
        window.location.reload();
      }
    });
  }

}
