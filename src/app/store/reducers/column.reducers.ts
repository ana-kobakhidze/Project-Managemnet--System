import { Column } from 'src/app/models/column.model';
import { All, ActionTypes } from '../actions/column.actions';

export interface State {
  columns: Column[];
}

export const initialState: State = {
  columns: [],
};

export function reducer(
  state : State = initialState, 
  action: All) {

  switch (action.type) {
    case ActionTypes.GET_ALL:
      return{
        ...state,
        columns: action.payload,
      };
      

    case ActionTypes.GET:
      return{
        ...state,
        columns: [...state.columns, action.payload],
      };
    case ActionTypes.CREATE:
      return{
        ...state,
        columns: [...state.columns, action.payload],
      };

    case ActionTypes.UPDATE:
      const updateAt = state.columns.findIndex(b=> b.id === action.payload.id);
      state.columns[updateAt] = action.payload
      return {
        ...state,
        columns: [...state.columns]
      };

    case ActionTypes.DELETE:
      const removeAt = state.columns.findIndex(b=> b.id === action.payload);
      state.columns.splice(removeAt,1);
      return{
        ...state,
        columns : [...state.columns]
      };


    default:
      return state;
  }
}
