import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of} from 'rxjs';
import { BoardService } from "src/app/board.service";
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';
import { Remove } from '../actions/loader.actions';
import { NotifierService } from 'angular-notifier';

import * as BoardActions from '../actions/board.actions';

@Injectable()
export class BoardEffects {
    constructor(private actions: Actions,
        private boardService: BoardService,
        private store: Store<AppState>,
        private notifierService: NotifierService){
    }

    GetAll = createEffect(() => this.actions.pipe(
        ofType(BoardActions.BoardActionTypes.GET_ALL_STARTED),
        switchMap(() => {
            return this.boardService.getBoards().pipe(
                map(response => {
                    this.store.dispatch(new Remove(false));
                    return new BoardActions.GetAll(response);
                }),
                catchError(err => {
                    this.store.dispatch(new Remove(false));
                    const errObj = JSON.parse(err.error);
                    this.notifierService.notify('error', errObj.message);
                    return of(new BoardActions.GetAllFailed(err));
                })
            )
        })
    ));
    
    GetBoard = createEffect(() => this.actions.pipe(
        ofType(BoardActions.BoardActionTypes.GET),
        switchMap((boardData: BoardActions.Get)=> {
            return this.boardService.getBoard(boardData.payload.id).pipe(
                map(response => {
                    this.store.dispatch(new Remove(false));
                    return new BoardActions.Get(response);
                }),
                catchError(err => {
                    this.store.dispatch(new Remove(false));
                    const errObj = JSON.parse(err.error);
                    this.notifierService.notify('error', errObj.message);
                    return of(new BoardActions.GetFailed(err));
                })
            )
        })
    ));

    CreateBoard = createEffect(() => this.actions.pipe(
        ofType(BoardActions.BoardActionTypes.CREATE_STARTED),
        switchMap((boardData: BoardActions.CreateStarted)=> {
            return this.boardService.createNewBoard(boardData.payload).pipe(
                map(response => {
                    this.store.dispatch(new Remove(false));
                    return new BoardActions.Create(response);
                }),
                catchError(err => {
                    this.store.dispatch(new Remove(false));
                    const errObj = JSON.parse(err.error);
                    this.notifierService.notify('error', errObj.message);
                    return of(new BoardActions.CreateFailed(err));
                })
            )
        })
    ));

    UpdateBoard = createEffect(() => this.actions.pipe(
        ofType(BoardActions.BoardActionTypes.UPDATE_STARTED),
        switchMap((boardData: BoardActions.UpdateStarted)=> {
            return this.boardService.updateBoard(boardData.payload).pipe(
                map(response => {
                    this.store.dispatch(new Remove(false));
                    return new BoardActions.Update(response);
                }),
                catchError(err => {
                    this.store.dispatch(new Remove(false));
                    const errObj = JSON.parse(err.error);
                    this.notifierService.notify('error', errObj.message);
                    return of(new BoardActions.UpdateFailed(err));
                })
            )
        })
    ));

    DeleteBoard = createEffect(() => this.actions.pipe(
        ofType(BoardActions.BoardActionTypes.DELETE_STARTED),
        switchMap((boardData: BoardActions.DeleteStarted)=> {
            return this.boardService.delete(boardData.payload).pipe(
                map(() => {
                    this.store.dispatch(new Remove(false));
                    return new BoardActions.Delete(boardData.payload);
                }),
                catchError(err => {
                    this.store.dispatch(new Remove(false));
                    const errObj = JSON.parse(err.error);
                    this.notifierService.notify('error', errObj.message);
                    return of(new BoardActions.DeleteFailed(err));
                })
            )
        })
    ));
}