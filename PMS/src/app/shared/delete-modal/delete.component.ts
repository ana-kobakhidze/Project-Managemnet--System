import { Component, Input, OnInit } from '@angular/core';
import { BoardsService } from '../../boards.service';
import { ColumnsService } from '../../columns.service';
import { TasksService } from '../../tasks.service';
import { AuthService } from '../../auth-service.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  providers: [AuthService, BoardsService, ColumnsService, TasksService]
})
export class DeleteComponent implements OnInit {

  @Input() message: string;
  @Input() callback: Function;
  @Input() param: {};
  @Input() id: string;

  constructor(
    private authService : AuthService,
    private boardService : BoardsService,
    private columnService : ColumnsService,
    private taskService : TasksService) {
   }

  ngOnInit(): void {
  }

  handleCancel() : void {
  }

  handleConfirm() : void {
    this.callback(this.param);
  }

}
