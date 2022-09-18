import { ErrorHandler, Injectable } from '@angular/core'
import { NotifierService } from 'angular-notifier';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private notifierService: NotifierService){

    }
    handleError(error : any) {
        let message = "";
        if(typeof error === 'object'){
            message = error.error.message;
            
        } else {
            message = error;
        }
        this.notifierService.notify('error', message);
    }
  }
  