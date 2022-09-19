import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AllBoardsComponent } from './all-boards/all-boards.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { ModalComponent } from './all-boards/modal/modal.component';
import { DeleteComponent } from './shared/delete-modal/delete.component';
import { BoardComponent } from './board/board.component';
import { CreateModalComponent } from './board/create-modal/create-modal.component';
import { CreateTaskModalComponent } from './board/create-task-modal/create-task-modal.component';
import { UpdateTaskModalComponent } from './board/update-task-modal/update-task-modal.component';
import { ColumnHeaderComponent } from './board/column-header/column-header.component';
import { ColumnTasksComponent } from './board/column-tasks/column-tasks.component';
import { DndModule } from 'ngx-drag-drop';
import { BoardColumnComponent } from './board/board-column/board-column.component';
import { TaskComponent } from './board/column-tasks/task/task.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducers } from './store/app.states';
import { StoreModule } from '@ngrx/store';
import { TokenInterceptor, ErrorInterceptor} from './token.interceptor';
import { AuthService } from './auth-service.service';
import { BoardsService } from './boards.service';
import { ColumnsService } from './columns.service';
import { TasksService } from './tasks.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AuthEffects } from './store/effects/auth.effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GlobalErrorHandler } from './shared/global-error-handler';
import { NotifierModule } from 'angular-notifier';


// Factory function required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomePageComponent,
    FooterComponent,
    AllBoardsComponent,
    SignUpFormComponent,
    LogInFormComponent,
    ModalComponent,
    DeleteComponent,
    BoardComponent,
    CreateModalComponent,
    CreateTaskModalComponent,
    UpdateTaskModalComponent,
    ColumnHeaderComponent,
    ColumnTasksComponent,
    BoardColumnComponent,
    TaskComponent,
    PageNotFoundComponent,
    EditProfileComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    DndModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    NotifierModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    BoardsService,
    ColumnsService,
    TasksService,
    [{provide: ErrorHandler, useClass: GlobalErrorHandler}],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
