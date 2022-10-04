import { Action } from '@ngrx/store';

export enum ActionTypes {
  ADD = '[Loader] add',
  REMOVE = '[Loader] remove',
}

export class Add {
  readonly type = ActionTypes.ADD;
  constructor(public payload: Boolean) {}
}

export class Remove {
  readonly type = ActionTypes.REMOVE;
  constructor(public payload: Boolean) {}
}
export type All = Add | Remove;
