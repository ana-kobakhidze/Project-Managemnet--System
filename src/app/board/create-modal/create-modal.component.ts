import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/models/column.model';
import { ColumnsService } from 'src/app/columns.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { CreateStarted } from 'src/app/store/actions/column.actions';
import { ActivatedRoute } from '@angular/router';
import { Add } from 'src/app/store/actions/loader.actions';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css'],
  providers: [ColumnsService],
})
export class CreateModalComponent implements OnInit {
  getState: Observable<any>;
  newColumn: Column = new Column();
  boardId: string;
  count: number = 0;

  constructor(
    private columnsService: ColumnsService,
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.activeRoute.paramMap.subscribe((param) => {
      this.boardId = param.get('id');
    });
    this.getState = this.store.select('columnState');
  }

  ngOnInit(): void {}

  onSubmit(submitedColumn: Column) {
    this.count++;
    this.store.dispatch(
      new CreateStarted(submitedColumn, this.count, this.boardId)
    );
    this.store.dispatch(new Add(true));
    this.getState.subscribe((state) => {
      this.newColumn = state.column;
      localStorage.setItem('column-id', state.column.id);
    });
  }
}
