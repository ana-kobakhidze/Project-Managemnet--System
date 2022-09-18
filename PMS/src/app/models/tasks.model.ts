import { File } from "./file.model";
export class Tasks{
    public id: string;
    public title: string;
    public order: string;
    public description: string;
    public userId: string;
    public boardId: string;
    public columnId: string;
    public files: File[];
}