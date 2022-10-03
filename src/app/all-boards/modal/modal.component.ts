import { Component, OnInit,Input } from '@angular/core';
import { BoardService } from '../../board.service';
import { Board } from 'src/app/models/board.model';
import { Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { CreateStarted, UpdateStarted } from 'src/app/store/actions/board.actions';
import { Add } from 'src/app/store/actions/loader.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [BoardService]
})

export class ModalComponent implements OnInit {
   @Input() board: Board;
   @Input() id: string;

  constructor( 
    private route: Router,
    private store: Store<AppState>) {
    if(!this.board){
      this.board = new Board();
    }
   }

  ngOnInit(): void {
  }
  
  onSubmit(submitedBoard: Board){
    if(this.board.id){
      this.store.dispatch(new UpdateStarted(this.board));
      this.store.dispatch(new Add(true));
    } else {
      this.store.dispatch(new CreateStarted(submitedBoard));
      this.store.dispatch(new Add(true));
    }
  }

}
