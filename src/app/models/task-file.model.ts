export class TaskFile{
    filename: string;
    fileSize: number;
    constructor(filename?:string, filesize?:number){
        this.filename = filename;
        this.fileSize = filesize;
    }
}