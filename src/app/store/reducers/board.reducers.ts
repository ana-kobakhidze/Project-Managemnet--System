import { Board } from 'src/app/models/board.model';
import * as BoardActions from '../actions/board.actions';

export interface State {
  allBoards: Board[];
  activeBoard: Board;
}

export const initialState: State = {
  allBoards: [],
  activeBoard: null,
};

export function reducer(state: State = initialState, action: BoardActions.All) {
  switch (action.type) {
    case BoardActions.BoardActionTypes.GET_ALL:
      return {
        ...state,
        allBoards: action.payload,
      };

    case BoardActions.BoardActionTypes.GET:
      return {
        ...state,
        activeBoard: action.payload,
      };

    case BoardActions.BoardActionTypes.CREATE:
      return {
        ...state,
        allBoards: [...state.allBoards, action.payload],
      };
    case BoardActions.BoardActionTypes.UPDATE:
      const updateAt = state.allBoards.findIndex(
        (b) => b.id === action.payload.id
      );
      state.allBoards[updateAt] = action.payload;
      return {
        ...state,
        allBoards: [...state.allBoards],
      };
    case BoardActions.BoardActionTypes.DELETE:
      const removeAt = state.allBoards.findIndex(
        (b) => b.id === action.payload
      );
      state.allBoards.splice(removeAt, 1);
      return {
        ...state,
        allBoards: [...state.allBoards],
      };
    default:
      return state;
  }
}
