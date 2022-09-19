import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../boards.service';
import { Boards } from 'src/app/models/boards.model';
import { Router} from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [BoardsService]
})
export class ModalComponent implements OnInit {
  newBoard: Boards = new Boards();

  constructor(private boardsService: BoardsService, private route: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(submitedBoard: Boards){
    this.boardsService.createNewBoard(submitedBoard)
      .subscribe(response => {
        this.newBoard = response;
        this.boardsService.setCurrentBoard(response);
        window.location.reload();
      });
  }

}
