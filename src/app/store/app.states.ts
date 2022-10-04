import { ActionReducerMap } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';
import * as board from './reducers/board.reducers';
import * as column from './reducers/column.reducers';
import * as task from './reducers/task.reducers';
import * as loader from './reducers/loader.reducers';

export interface AppState {
  authState: auth.State;
  boardState: board.State;
  columnState: column.State;
  taskState: task.State;
  loaderState: loader.State;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: auth.reducer,
  boardState: board.reducer,
  columnState: column.reducer,
  taskState: task.reducer,
  loaderState: loader.reducer,
};
