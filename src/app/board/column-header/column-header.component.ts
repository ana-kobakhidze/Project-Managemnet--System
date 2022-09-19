import { Component, Input, OnInit } from '@angular/core';
import { ColumnsService } from '../../columns.service';
import { Column } from 'src/app/models/column.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
  styleUrls: ['./column-header.component.css'],
  providers: [ColumnsService],
})
export class ColumnHeaderComponent implements OnInit {
  @Input() column: Column;
  titleIsEditable: boolean;
  boardId: string;
  newTitle: string;

  constructor(
    private columnsService: ColumnsService,
    private activeRoute: ActivatedRoute
  ) {
    this.titleIsEditable = false;
    this.activeRoute.paramMap.subscribe((param) => {
      this.boardId = param.get('id');
    });
  }

  ngOnInit(): void {}

  editColumnTitle() {
    this.titleIsEditable = true;
    this.newTitle = this.column.title;
  }

  cancelUpdate() {
    this.titleIsEditable = false;
    this.newTitle = this.column.title;
  }

  updateTitle() {
    this.column.title =
      this.column.title !== this.newTitle ? this.newTitle : this.column.title;
    this.columnsService.updateColumn(this.column).subscribe();
    this.titleIsEditable = false;
  }

  public deleteColumn = ({ id }) => {
    this.columnsService
      .deleteColumn(id)
      .subscribe(() => window.location.reload());
  };

  updateTitleHandler(event) {
    this.newTitle = event.target.value;
  }
}
