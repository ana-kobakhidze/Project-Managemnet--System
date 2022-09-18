import { Component, OnInit, Input } from '@angular/core';
import { Column } from '../../models/column.model';
import { DndDropEvent } from 'ngx-drag-drop';
import { ColumnsService } from '../../columns.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css'],
  providers: [ColumnsService],
})

export class BoardColumnComponent implements OnInit {

  @Input() column: Column;
  @Input() callback: Function

  draggable = {
    data: "",
    effectAllowed: "all",
    isExternal: true,
    dropEffect: "move",
    disable: false,
    handle: false
  };
  boardId = "";

  constructor(private columnsService: ColumnsService,
    private activeRoute : ActivatedRoute) { 
      this.activeRoute.paramMap.subscribe( param => {
        this.boardId = param.get('id')
       });
    }

  ngOnInit(): void {
    this.draggable ={
      data: JSON.stringify(this.column),
      effectAllowed: "all",
      isExternal: true,
      dropEffect: "copy",
      disable: false,
      handle: false
    };
  }

  onDragStart(event:DragEvent) {
    event.dataTransfer.setData('id', JSON.stringify(this.column));

    // console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragover(event:DragEvent):Boolean {
    if (event.preventDefault) {
      event.preventDefault();
    }
    
    return false;
    // console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event:DndDropEvent) {
    const parsedColumn = JSON.parse(event.data);
    const tmpOrder = parsedColumn.order;
    parsedColumn.order = this.column.order;
    this.column.order = tmpOrder;

    // console.log("parsedColumn after update: "+ JSON.stringify(parsedColumn));
    // console.log("this.Column after update: "+ JSON.stringify(this.column));

    this.columnsService.updateColumn(parsedColumn).subscribe(res=>{
      this.callback(true);
    });
    // console.log("drop", JSON.stringify(event, null, 2));
  }
}
