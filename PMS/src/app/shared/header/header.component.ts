import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState, selectAuthState } from '../../store/app.states';
import { LogOut, SyncState } from 'src/app/store/user.actions';
import { initialState, State } from 'src/app/store/reducers/auth.reducers';
import { TranslateService } from '@ngx-translate/core';

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
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      if (!state.isAuthenticated) {
        const storedState = JSON.parse(localStorage.getItem('state'));
        if (storedState && storedState.isAuthenticated) {
          this.store.dispatch(new SyncState(storedState));
          this.isAuthorized = storedState.isAuthenticated;
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
    this.store.dispatch(new LogOut());
  }

  handleLanguageChange(lang: string): void {
    this.translate.use(lang);
  }
}
