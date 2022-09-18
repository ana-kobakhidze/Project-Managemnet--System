import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AllBoardsComponent } from './all-boards/all-boards.component';
import { BoardComponent } from './board/board.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo:"home", pathMatch:'full' },
  { path:'home',component: WelcomePageComponent},
  { path:'boards', component: AllBoardsComponent, canActivate: [AuthGuard]},
  { path: 'board/:id', component: BoardComponent, canActivate: [AuthGuard]},
  { path: 'sign-in', component: LogInFormComponent},
  { path: 'sign-up', component: SignUpFormComponent},
  { path:'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]},
  { path: '**', component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }