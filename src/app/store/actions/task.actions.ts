import { Action } from "@ngrx/store";
import { FileModel as FileModel } from "src/app/models/file.model";
import { Task } from "src/app/models/task.model";

export enum ActionTypes {
    GET_ALL = "[Task] get all tasks succeeded",
    GET_ALL_STARTED = "[Task] get all tasks started",
    GET_ALL_FAILED = "[Task] get all tasks failed",
    GET = "[Task] task get",
    GET_STARTED = "[Task] task get started",
    GET_FAILED = "[Task] task get failed",
    CREATE = "[Task] task create succeeded",
    CREATE_STARTED = "[Task] task create started",
    CREATE_FAILED = "[Task] task create failed",
    UPDATE = "[Task] task update succeeded",
    UPDATE_STARTED = "[Task] task update started",
    UPDATE_FAILED = "[Task] task update failed",
    DELETE = "[Task] task delete succeeded",
    DELETE_STARTED = "[Task] task delete started",
    DELETE_FAILED = "[Task] task delete failed",
    FILE_ADD_STARTED = "[Task] file add started",
    FILE_ADD = "[Task] file added successfully",
    FILE_ADD_FAILED = "[Task] file add failed" 
}

export class GetAll implements Action {
    readonly type = ActionTypes.GET_ALL;
    constructor(public payload: Task[]){}
}

export class GetAllStarted implements Action {
    readonly type = ActionTypes.GET_ALL_STARTED;
    constructor( public boardId: string, public columnId: string){}
}

export class GetAllFailed implements Action {
    readonly type = ActionTypes.GET_ALL_FAILED;
    constructor(public err: string){}
}

export class Get implements Action {
    readonly type = ActionTypes.GET;
    constructor(public payload: Task){}
}

export class GetStarted implements Action {
    readonly type = ActionTypes.GET_STARTED;
    constructor(public payload: {columnId: string, taskId: string}){}
}

export class GetFailed implements Action {
    readonly type = ActionTypes.GET_FAILED;
    constructor(public err: string){}
}

export class Create implements Action {
    readonly type = ActionTypes.CREATE;
    constructor(public payload: Task){}
}

export class CreateStarted implements Action {
    readonly type = ActionTypes.CREATE_STARTED;
    constructor(public payload: Task,
        public boardId: string,
        public columnId: string
       ){
       }
}

export class CreateFailed implements Action {
    readonly type = ActionTypes.CREATE_FAILED;
    constructor(public err: string){}
}

export class Update implements Action {
    readonly type = ActionTypes.UPDATE;
    constructor(public payload: Task){}
}

export class UpdateStarted implements Action {
    readonly type = ActionTypes.UPDATE_STARTED;
    constructor(public payload: Task,
        public boardId: string,
        public columnId: string
        ){}
}

export class UpdateFailed implements Action {
    readonly type = ActionTypes.UPDATE_FAILED;
    constructor(public err: string){}
}

export class Delete implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public boardId: string, 
        public columnId: string, 
        public taskId: string){}
}

export class DeleteStarted implements Action {
    readonly type = ActionTypes.DELETE_STARTED;
    constructor(
        public boardId: string,
        public columnId: string, 
        public taskId: string
        ){}
    }

export class DeleteFailed implements Action {
    readonly type = ActionTypes.DELETE_FAILED;
    constructor(public err: string){}
}

export class FileAddStarted implements Action {
    readonly type = ActionTypes.FILE_ADD_STARTED;
    constructor(public fileModel: FileModel){}
}

export class FileAdded implements Action {
    readonly type = ActionTypes.FILE_ADD;
    constructor(public fileModel: FileModel){}
}

export class FileAddFailed implements Action {
    readonly type = ActionTypes.FILE_ADD_FAILED;
    constructor(public err: string){}
}

export type All =
| GetAll
| GetAllStarted
| GetAllFailed
| Get
| GetStarted
| GetFailed
| Create
| CreateStarted
| CreateFailed
| Update
| UpdateStarted
| UpdateFailed
| Delete
| DeleteStarted
| DeleteFailed
| FileAddStarted
| FileAdded
| FileAddFailed