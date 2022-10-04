import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.states';
import {
  LogOut,
  LogOutStarted,
  SyncState,
} from 'src/app/store/actions/user.actions';
import { TranslateService } from '@ngx-translate/core';
import { GetAllStarted } from 'src/app/store/actions/board.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthorized: Boolean;
  getState: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public translate: TranslateService
  ) {
    this.getState = this.store.select('authState');
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      if (!state.isAuthenticated) {
        const storedState = JSON.parse(localStorage.getItem('state'));
        if (storedState && storedState.isAuthenticated) {
          this.store.dispatch(new SyncState(storedState));
          this.isAuthorized = storedState.isAuthenticated;
          this.store.dispatch(new GetAllStarted());
        } else {
          this.isAuthorized = false;
        }
      } else {
        this.isAuthorized = state.isAuthenticated;
      }
    });
  }
  redirectTo() {
    this.route.snapshot.paramMap.get('boards/create-new');
  }

  logOut(): void {
    this.store.dispatch(new LogOutStarted());
  }

  handleLanguageChange(lang: string): void {
    this.translate.use(lang);
  }
}
