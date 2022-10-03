import { TaskFile } from 'src/app/models/task-file.model';
import { Task } from 'src/app/models/task.model';
import { All, ActionTypes } from '../actions/task.actions';

export interface State {
  tasks: Task[];
}

export const initialState: State = {
  tasks: [],
};

export function reducer(state: State = initialState, action: All) {
  switch (action.type) {
    case ActionTypes.GET_ALL:
      action.payload.forEach((task: Task) => {
        const currIndex = state.tasks.findIndex((st) => st.id === task.id);
        if (currIndex > -1) {
          state.tasks[currIndex] = task;
        } else {
          state.tasks.push(task);
        }
      });
      return {
        ...state,
        tasks: [...state.tasks],
      };
    case ActionTypes.GET:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case ActionTypes.CREATE:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case ActionTypes.UPDATE:
      const updateAt = state.tasks.findIndex((b) => b.id === action.payload.id);
      state.tasks[updateAt] = action.payload;

      return {
        ...state,
        tasks: [...state.tasks],
      };
    case ActionTypes.DELETE:
      const removeAt = state.tasks.findIndex((b) => b.id === action.taskId);
      state.tasks.splice(removeAt, 1);
      return {
        ...state,
        tasks: [...state.tasks],
      };
    case ActionTypes.FILE_ADD:
      const taskIndex = state.tasks.findIndex(
        (b) => b.id === action.fileModel.taskId
      );
      if (taskIndex > -1) {
        const taskFile = new TaskFile(action.fileModel.file.name, action.fileModel.file.size);
        const files = state.tasks[taskIndex].files || [];
        files.push(taskFile);
        state.tasks[taskIndex].files = files;
      }
      return {
        ...state,
        tasks: [...state.tasks],
      };

    default:
      return state;
  }
}
