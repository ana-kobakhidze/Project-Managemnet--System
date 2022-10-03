import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, switchMap, of, mergeMap, concatMap, exhaustMap } from 'rxjs';
import { TasksService } from "src/app/tasks.service";
import { Remove } from "../actions/loader.actions";
import { NotifierService } from 'angular-notifier';
import { FileService } from "src/app/file.service";

import * as TaskActions from '../actions/task.actions';
import { AppState } from "../app.states";
import { FileModel } from "src/app/models/file.model";

@Injectable()
export class TaskEffect {
    constructor(private actions: Actions,
        private taskService: TasksService,
        private store: Store<AppState>,
        private fileService: FileService,
        private notifierService: NotifierService){
    }

    GetAll = createEffect(() => this.actions.pipe(
        ofType(TaskActions.ActionTypes.GET_ALL_STARTED),
        mergeMap((taskData : TaskActions.GetAllStarted) => {
            return this.taskService.getTasks(taskData.boardId, taskData.columnId).pipe(
                map(response => {
                    this.store.dispatch(new Remove(false));
                    return new TaskActions.GetAll(response);
                }),
                catchError(err => {
                    this.store.dispatch(new Remove(false));
                    const errObj = JSON.parse(err.error);
                    this.notifierService.notify('error', errObj.message);
                    return of(new TaskActions.GetAllFailed(err));
                })
            )
        })
    ));
    
    GetTask = createEffect(() => this.actions.pipe(
        ofType(TaskActions.ActionTypes.GET_STARTED),
        switchMap((taskData: TaskActions.GetStarted)=> {
            return this.taskService.getTask(taskData.payload.columnId,taskData.payload.taskId).pipe(
                map(response => {
                    this.store.dispatch(new Remove(false));
                    return new TaskActions.Get(response);
                }),
                catchError(err => {
                    this.store.dispatch(new Remove(false));
                    const errObj = JSON.parse(err.error);
                    this.notifierService.notify('error', errObj.message);
                    return of(new TaskActions.GetAllFailed(err));
                })
            )
        })
    ));

    CreateTask = createEffect(() => this.actions.pipe(
        ofType(TaskActions.ActionTypes.CREATE_STARTED),
        switchMap((taskData: TaskActions.CreateStarted)=> {
            return this.taskService.createTask(taskData.payload, taskData.boardId, taskData.columnId).pipe(
                map(response => {
                    this.store.dispatch(new Remove(false));
                    return new TaskActions.Create(response);
                }),
                catchError(err => {
                    this.store.dispatch(new Remove(false));
                    const errObj = JSON.parse(err.error);
                    this.notifierService.notify('error', errObj.message);
                    return of(new TaskActions.CreateFailed(err));
                })
            )
        })
    ));

    UpdateTask = createEffect(() => this.actions.pipe(
        ofType(TaskActions.ActionTypes.UPDATE_STARTED),
        switchMap((taskData: TaskActions.UpdateStarted)=> {
            return this.taskService.updateTasks(taskData.payload, taskData.boardId, taskData.columnId).pipe(
                map(response => {
                    this.store.dispatch(new Remove(false));
                    return new TaskActions.Update(response);
                }),
                catchError(err => {
                    this.store.dispatch(new Remove(false));
                    const errObj = JSON.parse(err.error);
                    this.notifierService.notify('error', errObj.message);
                    return of(new TaskActions.UpdateFailed(err));
                })
            )
        })
    ));

    DeleteTask = createEffect(() => this.actions.pipe(
        ofType(TaskActions.ActionTypes.DELETE_STARTED),
        switchMap((taskData: TaskActions.DeleteStarted)=> {
            return this.taskService.deleteTask(taskData.boardId,taskData.columnId, taskData.taskId).pipe(
                map(() => {
                    this.store.dispatch(new Remove(false));
                    return new TaskActions.Delete(taskData.boardId,taskData.columnId, taskData.taskId);
                }),
                catchError(err => {
                    this.store.dispatch(new Remove(false));
                    const errObj = JSON.parse(err.error);
                    this.notifierService.notify('error', errObj.message);
                    return of(new TaskActions.DeleteFailed(err));
                })
            )
        })
    ));

    addFile = createEffect(() => this.actions.pipe(
        ofType(TaskActions.ActionTypes.FILE_ADD_STARTED),
        switchMap((taskData: TaskActions.FileAddStarted)=> {
            return this.fileService.uploadFile(taskData.fileModel).pipe(
                map(response => {
                    this.store.dispatch(new Remove(false));
                    return new TaskActions.FileAdded(new FileModel(taskData.fileModel.taskId, taskData.fileModel.file));
                }),
                catchError(err => {
                    this.store.dispatch(new Remove(false));
                    const errObj = JSON.parse(err.error);
                    this.notifierService.notify('error', errObj.message);
                    return of(new TaskActions.FileAddFailed(err));
                })
            )
        })
    ));


}