import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { LogOut, LogOutStarted} from 'src/app/store/actions/user.actions';
import { AppState } from '../store/app.states';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [AuthService]
})
export class EditProfileComponent implements OnInit {
  user: User = new User();

  constructor(private service: AuthService, private route: Router, private store: Store<AppState>) {

   }

  ngOnInit(): void {
    this.service.getUser().subscribe(response => {
      this.user = response;
    });
  }
  onSubmit(submitedUser: User){
    this.service.updateUser(submitedUser).subscribe(response => {
      this.route.navigate(['boards']);
    })
  }
  public deleteUser = () => {
     this.service.deleteUser().subscribe(response => {
      this.store.dispatch(new LogOutStarted());
      this.route.navigate(['sign-in']);
     });

     
  }

}
