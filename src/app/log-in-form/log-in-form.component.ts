import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { AppState } from '../store/app.states';
import { LogIn } from '../store/actions/user.actions';
import { Add } from '../store/actions/loader.actions';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css'],
  providers: [AuthService],
})
export class LogInFormComponent implements OnInit {
  userModel: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private service: AuthService,
    private route: Router,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select('authState');
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(submitedUser: User) {
    this.store.dispatch(new LogIn(submitedUser));
    this.store.dispatch(new Add(true));
  }
}
