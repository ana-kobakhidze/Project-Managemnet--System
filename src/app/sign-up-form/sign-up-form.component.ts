import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { SignUp } from '../store/actions/user.actions';
import { AppState} from '../store/app.states';
import { Observable } from 'rxjs';
import { Add } from '../store/actions/loader.actions';

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
    private route: Router) { 
      this.getState = this.store.select("authState");
    }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(submitedUser: User){
    this.store.dispatch(new SignUp(submitedUser));
    this.store.dispatch(new Add(true));
    this.route.navigate(['sign-in']);
    this.getState.subscribe(state =>{
      this.userModel = state.userModel;
    })


  }

  validate(event){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }

}
