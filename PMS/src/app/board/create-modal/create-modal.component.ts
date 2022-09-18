import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/models/column.model';
import { ColumnsService } from 'src/app/columns.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css'],
  providers: [ColumnsService],
})
export class CreateModalComponent implements OnInit {
  newColumn: Column = new Column();

  constructor(private columnsService: ColumnsService) {}

  ngOnInit(): void {}

  onSubmit(submitedColumn: Column) {
    this.columnsService.createColumn(submitedColumn).subscribe((response) => {
      this.newColumn = response;
      localStorage.setItem('column-id', response.id);
      window.location.reload();
    });
  }
}
