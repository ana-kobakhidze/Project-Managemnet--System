import { Action } from '@ngrx/store';
import { Column } from 'src/app/models/column.model';

export enum ActionTypes {
  GET_ALL = '[Column] get all columns',
  GET_ALL_STARTED = '[Column] get all columns started',
  GET_ALL_FAILED = '[Column] get all columns failed',
  CREATE = '[Column] create new column',
  CREATE_STARTED = '[Column] create new column started',
  CREATE_FAILED = '[Column] create new column failed',
  GET = '[Column] get column',
  GET_STARTED = '[Column] get column started',
  GET_FAILED = '[Column] get failed',
  UPDATE = '[Column] column update',
  UPDATE_STARTED = '[Column] column update started',
  UPDATE_FAILED = '[Column] column update failed',
  DELETE = '[Column] column delete',
  DELETE_STARTED = '[Column] column delete started',
  DELETE_FAILED = '[Column] column delete failed',
}

export class GetAllStarted implements Action {
  readonly type = ActionTypes.GET_ALL_STARTED;
  constructor(public payload: string) {}
}

export class GetAll implements Action {
  readonly type = ActionTypes.GET_ALL;
  constructor(public payload: Column[]) {}
}

export class GetAllFailed implements Action {
  readonly type = ActionTypes.GET_ALL_FAILED;
  constructor(public payload: string) {}
}

export class GetStarted implements Action {
  readonly type = ActionTypes.GET_STARTED;
}

export class Get implements Action {
  readonly type = ActionTypes.GET;
  constructor(public payload: Column) {}
}

export class GetFailed implements Action {
  readonly type = ActionTypes.GET_FAILED;
  constructor(public err: string) {}
}

export class CreateStarted implements Action {
  readonly type = ActionTypes.CREATE_STARTED;
  constructor(
    public title: Column,
    public order: number,
    public boardId: string
  ) {}
}

export class Create implements Action {
  readonly type = ActionTypes.CREATE;
  constructor(public payload: Column) {}
}

export class CreateFailed implements Action {
  readonly type = ActionTypes.CREATE_FAILED;
  constructor(public err: string) {}
}

export class UpdateStarted implements Action {
  readonly type = ActionTypes.UPDATE_STARTED;
  constructor(public payload: Column, public boardId: string) {}
}

export class Update implements Action {
  readonly type = ActionTypes.UPDATE;
  constructor(public payload: Column) {}
}

export class UpdateFailed implements Action {
  readonly type = ActionTypes.UPDATE_FAILED;
  constructor(public err: string) {}
}

export class DeleteStarted implements Action {
  readonly type = ActionTypes.DELETE_STARTED;
  constructor(public payload: string, public boardId: string) {}
}

export class Delete implements Action {
  readonly type = ActionTypes.DELETE;
  constructor(public payload: string) {}
}

export class DeleteFailed implements Action {
  readonly type = ActionTypes.DELETE_FAILED;
  constructor(public err: string) {}
}

export type All =
  | GetAllStarted
  | GetAll
  | GetAllFailed
  | GetStarted
  | Get
  | GetFailed
  | Create
  | CreateStarted
  | CreateFailed
  | UpdateStarted
  | Update
  | UpdateFailed
  | DeleteStarted
  | Delete
  | DeleteFailed;
