import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState} from '../store/app.states';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Board } from '../models/board.model';
import { BoardService } from '../board.service';

import { DeleteStarted, GetAllStarted } from '../store/actions/board.actions';
import { Add } from '../store/actions/loader.actions';


@Component({
  selector: 'app-all-boards',
  templateUrl: './all-boards.component.html',
  styleUrls: ['./all-boards.component.css'],
  providers: [BoardService],
})
export class AllBoardsComponent implements OnInit {
  getState: Observable<any>;
  allBoards: Board[] = [];
  imgSources :string[];
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select("boardState"); 
    this.imgSources = ['./assets/images/board_1.svg','./assets/images/board_2.svg','./assets/images/board_3.svg','./assets/images/board_4.svg','./assets/images/board_5.svg','./assets/images/board_6.svg','./assets/images/board_7.svg','~/assets/images/board_8.svg']
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllStarted());
    this.store.dispatch(new Add(true));
    this.getState.subscribe((state) => {
      this.allBoards = state.allBoards;
      this.allBoards.forEach((board, index) =>{
        if(index >= this.imgSources.length - 1){
          this.imgSources = this.imgSources.concat(this.imgSources)
        }
        board.src = this.imgSources[index];
       })
    });
  }

  public deleteBoard = ({ id }): void => {
    this.store.dispatch(new DeleteStarted(id));  
    this.store.dispatch(new Add(true));
  };

  goToBoard(id: string): void {
    this.router.navigate(['/board/', id]);
  }
}
