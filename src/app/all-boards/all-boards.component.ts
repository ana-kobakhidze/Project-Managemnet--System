import { Component, OnInit } from '@angular/core';
import { Boards } from '../models/boards.model';
import { BoardsService } from '../boards.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-boards',
  templateUrl: './all-boards.component.html',
  styleUrls: ['./all-boards.component.css'],
  providers: [BoardsService],
})
export class AllBoardsComponent implements OnInit {
  allBoards: Boards[] = [];

  constructor(
    private boardService: BoardsService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardService.getBoards().subscribe((response) => {
      this.allBoards = response;
    });
    this.activeRoute.paramMap.subscribe((param) => {
      param.get('id');
    });
  }

  public deleteBoard = ({ id }): void => {
    this.boardService.delete(id).subscribe(() => window.location.reload());
  };

  goToBoard(id: string): void {
    this.router.navigate(['/board/', id]);
  }
}
