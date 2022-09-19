import { Component, OnInit, Input } from '@angular/core';
import { Tasks } from 'src/app/models/tasks.model';
import { TasksService } from 'src/app/tasks.service';
import { BoardsService } from 'src/app/boards.service';
import { DndDropEvent } from 'ngx-drag-drop';
import { ColumnsService } from 'src/app/columns.service';
import { Column } from 'src/app/models/column.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TasksService, BoardsService, ColumnsService],
})
export class TaskComponent implements OnInit {
  @Input() task: Tasks;
  @Input() callback: Function;
  @Input() column: Column;
  tasks: Tasks[];
  boardId: string;

  draggable = {
    data: '',
    effectAllowed: 'all',
    isExternal: true,
    dropEffect: 'move',
    disable: false,
    handle: false,
  };

  constructor(
    private boardService: BoardsService,
    private columnService: ColumnsService,
    private taskService: TasksService
  ) {
    this.boardId = this.boardService.getBoardId();
  }

  ngOnInit(): void {
    this.draggable = {
      data: JSON.stringify(this.task),
      effectAllowed: 'all',
      isExternal: true,
      dropEffect: 'copy',
      disable: false,
      handle: false,
    };
  }
  public deleteTask = ({taskId, columnId}) =>{
    this.taskService
      .deleteTask(columnId, taskId)
      .subscribe(()=> window.location.reload());
  }

  onDragStart(event: DragEvent) {
    event.dataTransfer.setData('id', JSON.stringify(this.task));

    // console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent): Boolean {
    if (event.preventDefault) {
      event.preventDefault();
    }

    return false;
    // console.log("dragover", JSON.stringify(event, null, 2));
  }
  onDrop(event: DndDropEvent) {
    const parsedTask = JSON.parse(event.data);
    const oldColId = parsedTask.columnId;
    parsedTask.order = this.task.order;
    parsedTask.columnId = this.column.id;

    this.taskService.updateTasks(parsedTask, oldColId).subscribe((res) => {
      this.callback(true);
      window.location.reload();
    });

  }
}
