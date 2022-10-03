import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState} from '../../store/app.states';
import { DeleteStarted, UpdateStarted } from 'src/app/store/actions/column.actions';
import { ColumnsService } from '../../columns.service';
import { Column } from 'src/app/models/column.model';
import { ActivatedRoute } from '@angular/router';
import { Add } from 'src/app/store/actions/loader.actions';

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
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>
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
    this.store.dispatch(new UpdateStarted(this.column, this.boardId));
    this.store.dispatch(new Add(true));
    this.titleIsEditable = false;
  }

  public deleteColumn = ({ id }) => {
    this.store.dispatch(new DeleteStarted(id, this.boardId));
    this.store.dispatch(new Add(true));
  };

  updateTitleHandler(event) {
    this.newTitle = event.target.value;
  }
}
