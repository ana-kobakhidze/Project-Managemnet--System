import { ErrorHandler, Injectable } from '@angular/core'
import { NotifierService } from 'angular-notifier';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private notifierService: NotifierService){

    }
    handleError(error : any) {
        let message = "";
        if(typeof error === 'object'){
          if(error.error && error.error.message){
            message = error.error.message;
          }
          else{
            console.error(error);
            message='Something went wrong, please try again later';
          }
        } else {
            message = error;
        }
        this.notifierService.notify('error', message);
    }
  }
  