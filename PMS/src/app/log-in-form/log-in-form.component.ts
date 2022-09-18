import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service.service';
import { User } from '../models/user.model';
import { AppState, selectAuthState } from '../store/app.states';
import {LogIn} from '../store/user.actions'

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css'],
  providers: [AuthService]
})
export class LogInFormComponent implements OnInit {
  userModel: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private service: AuthService,
     private route: Router,
     private store: Store<AppState>) {
      this.getState = this.store.select(selectAuthState);
      }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }
  
  onSubmit(submitedUser: User){
    // this.service.logInUser(submitedUser).subscribe(response=> {
    //   const payload = {
    //     login: submitedUser.login,
    //     password: submitedUser.password,
    //     token: response.token
    //   };
    // });
    this.store.dispatch(new LogIn(submitedUser));  

    // this.route.navigate(['boards']);
  }
}
