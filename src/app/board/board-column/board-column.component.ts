import { Component, OnInit, Input } from '@angular/core';
import { Column } from '../../models/column.model';
import { ColumnsService } from '../../columns.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.css'],
  providers: [ColumnsService],
})
export class BoardColumnComponent implements OnInit {
  @Input() column: Column;
  @Input() callback: Function;
  @Input() allColumnIds: [];
  hasBorder: Boolean = false;

  boardId = '';

  constructor(
    private columnsService: ColumnsService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.paramMap.subscribe((param) => {
      this.boardId = param.get('id');
    });
  }

  ngOnInit(): void {}
}
