import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { User } from '../models/user.model';
import { SignUp } from '../store/user.actions';
import { AppState, selectAuthState} from '../store/app.states';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
  providers: [AuthService]
})
export class SignUpFormComponent implements OnInit {
  userModel: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  
  constructor(private store: Store<AppState>, 
    private service: AuthService,
    private route: Router) { 
      this.getState = this.store.select(selectAuthState);
    }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }
  onSubmit(submitedUser: User){
    this.service.signUpUser(submitedUser)
      .subscribe(response => {
        this.userModel = response;
        let user = {
          id: response.id,
          name: response.name,
          login: response.login
        }
        this.store.dispatch(new SignUp(user));
        this.route.navigate(['sign-in']);
      });

  }
  validate(){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }

}
