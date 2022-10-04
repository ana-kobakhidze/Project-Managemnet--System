import { TaskFile } from "./task-file.model";
export class Task{
    public id: string;
    public title: string;
    public order: string;
    public done: boolean;
    public description: string;
    public userId: string;
    public boardId: string;
    public columnId: string;
    public files: TaskFile[];
    public oldColumnId: string;
}