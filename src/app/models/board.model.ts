import { Column } from "./column.model";

export class Board{
    public id: string;
    public title: string;
    public description: string;
    public src: string;
    public columns: Column[]

    constructor(id?:string){
        this.id = id;
    }
}