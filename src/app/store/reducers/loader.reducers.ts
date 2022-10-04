import { All, ActionTypes } from '../actions/loader.actions';

export interface State {
  isLoading: Boolean;
}

export const initialState: State = {
  isLoading: false,
};
export function reducer(state = initialState, action: All) {
  switch (action.type) {
    case ActionTypes.ADD:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.REMOVE:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
