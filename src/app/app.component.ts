import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.states';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  getState: Observable<any>;
  title = 'PMA';
  isLoading: Boolean;

  constructor(
    public translate: TranslateService,
    public store: Store<AppState>
  ) {
    this.getState = this.store.select('loaderState');
    translate.addLangs(['en', 'ge']);
    translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.isLoading = state.isLoading;
    });
  }
}
