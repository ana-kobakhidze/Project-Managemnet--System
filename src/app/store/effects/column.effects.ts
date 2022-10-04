import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, of, mergeMap } from 'rxjs';
import { ColumnsService } from 'src/app/columns.service';
import { NotifierService } from 'angular-notifier';

import * as ColumnActions from '../actions/column.actions';
import { Remove } from '../actions/loader.actions';
import { AppState } from '../app.states';

@Injectable()
export class ColumnEffects {
  constructor(
    private actions: Actions,
    private columnService: ColumnsService,
    private store: Store<AppState>,
    private notifierService: NotifierService
  ) {}

  GetAll = createEffect(() =>
    this.actions.pipe(
      ofType(ColumnActions.ActionTypes.GET_ALL_STARTED),
      switchMap((columnData: ColumnActions.GetAllStarted) => {
        return this.columnService.getColumns(columnData.payload).pipe(
          map((response) => {
            this.store.dispatch(new Remove(false));
            return new ColumnActions.GetAll(response);
          }),
          catchError((err) => {
            this.store.dispatch(new Remove(false));
            this.notifierService.notify('error', err.error.message);
            return of(new ColumnActions.GetAllFailed(err));
          })
        );
      })
    )
  );

  GetColumn = createEffect(() =>
    this.actions.pipe(
      ofType(ColumnActions.ActionTypes.GET),
      switchMap((columnData: ColumnActions.Get) => {
        return this.columnService.getColumn(columnData.payload.id).pipe(
          map((response) => {
            this.store.dispatch(new Remove(false));
            return new ColumnActions.Get(response);
          }),
          catchError((err) => {
            this.store.dispatch(new Remove(false));
            this.notifierService.notify('error', err.error.message);
            return of(new ColumnActions.GetFailed(err));
          })
        );
      })
    )
  );

  CreateColumn = createEffect(() =>
    this.actions.pipe(
      ofType(ColumnActions.ActionTypes.CREATE_STARTED),
      switchMap((columnData: ColumnActions.CreateStarted) => {
        return this.columnService
          .createColumn(columnData.title, columnData.order, columnData.boardId)
          .pipe(
            map((response) => {
              this.store.dispatch(new Remove(false));
              return new ColumnActions.Create(response);
            }),
            catchError((err) => {
              this.store.dispatch(new Remove(false));
              this.notifierService.notify('error', err.error.message);
              return of(new ColumnActions.CreateFailed(err));
            })
          );
      })
    )
  );

  UpdateColumn = createEffect(() =>
    this.actions.pipe(
      ofType(ColumnActions.ActionTypes.UPDATE_STARTED),
      mergeMap((columnData: ColumnActions.UpdateStarted) => {
        return this.columnService
          .updateColumn(columnData.payload, columnData.boardId)
          .pipe(
            map((response) => {
              this.store.dispatch(new Remove(false));
              return new ColumnActions.Update(response);
            }),
            catchError((err) => {
              this.store.dispatch(new Remove(false));
              this.notifierService.notify('error', err.error.message);
              return of(new ColumnActions.UpdateFailed(err));
            })
          );
      })
    )
  );

  DeleteColumn = createEffect(() =>
    this.actions.pipe(
      ofType(ColumnActions.ActionTypes.DELETE_STARTED),
      switchMap((columnData: ColumnActions.DeleteStarted) => {
        return this.columnService
          .deleteColumn(columnData.payload, columnData.boardId)
          .pipe(
            map(() => {
              this.store.dispatch(new Remove(false));
              return new ColumnActions.Delete(columnData.payload);
            }),
            catchError((err) => {
              this.store.dispatch(new Remove(false));
              this.notifierService.notify('error', err.error.message);
              return of(new ColumnActions.DeleteFailed(err));
            })
          );
      })
    )
  );
}
