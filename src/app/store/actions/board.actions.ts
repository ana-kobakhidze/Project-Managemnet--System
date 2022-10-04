import { Action } from '@ngrx/store';
import { Board } from 'src/app/models/board.model';

export enum BoardActionTypes {
  GET_ALL_STARTED = '[Boards] get all boards started',
  GET_ALL = '[Boards] get all boards succeeded',
  GET_ALL_FAILED = '[Boards] get all boards failed',
  GET_STARTED = '[Board] get board started',
  GET = '[Board] get board succeeded',
  GET_FAILED = '[Board] get board failed',
  CREATE_STARTED = '[Board] create new board started',
  CREATE = '[Board] create new board succeeded',
  CREATE_FAILED = '[Board] create new board failed',
  UPDATE_STARTED = '[BOARD] update board started',
  UPDATE = '[BOARD] update board',
  UPDATE_FAILED = '[Board] update board failed',
  DELETE_STARTED = '[Board] delete board started',
  DELETE = '[Board] delete board succeeded',
  DELETE_FAILED = '[Board] delete board failed',
}

export class GetAllStarted implements Action {
  readonly type = BoardActionTypes.GET_ALL_STARTED;
}

export class GetAll implements Action {
  readonly type = BoardActionTypes.GET_ALL;
  constructor(public payload: Board[]) {}
}

export class GetAllFailed implements Action {
  readonly type = BoardActionTypes.GET_ALL_FAILED;
  constructor(public payload: string) {}
}

export class GetStarted implements Action {
  readonly type = BoardActionTypes.GET_STARTED;
}

export class Get implements Action {
  readonly type = BoardActionTypes.GET;
  constructor(public payload: Board) {}
}

export class GetFailed implements Action {
  readonly type = BoardActionTypes.GET_FAILED;
  constructor(public payload: string) {}
}

export class CreateStarted implements Action {
  readonly type = BoardActionTypes.CREATE_STARTED;
  constructor(public payload: Board) {}
}

export class Create implements Action {
  readonly type = BoardActionTypes.CREATE;
  constructor(public payload: Board) {}
}

export class CreateFailed implements Action {
  readonly type = BoardActionTypes.CREATE_FAILED;
  constructor(public payload: string) {}
}
export class UpdateStarted implements Action {
  readonly type = BoardActionTypes.UPDATE_STARTED;
  constructor(public payload: Board) {}
}

export class Update implements Action {
  readonly type = BoardActionTypes.UPDATE;
  constructor(public payload: Board) {}
}

export class UpdateFailed implements Action {
  readonly type = BoardActionTypes.UPDATE_FAILED;
  constructor(public payload: string) {}
}

export class DeleteStarted implements Action {
  readonly type = BoardActionTypes.DELETE_STARTED;
  constructor(public payload: string) {}
}

export class Delete implements Action {
  readonly type = BoardActionTypes.DELETE;
  constructor(public payload: string) {}
}

export class DeleteFailed implements Action {
  readonly type = BoardActionTypes.DELETE_FAILED;
  constructor(public payload: string) {}
}

export type All =
  | GetAllStarted
  | GetAll
  | GetAllFailed
  | GetStarted
  | Get
  | GetFailed
  | CreateStarted
  | Create
  | CreateFailed
  | UpdateStarted
  | Update
  | UpdateFailed
  | DeleteStarted
  | Delete
  | DeleteFailed;
