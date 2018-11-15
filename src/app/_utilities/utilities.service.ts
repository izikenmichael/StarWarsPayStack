import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  handleError(error?: HttpErrorResponse) {
    console.log(error);
    let errormessage;
    if (error.error instanceof ErrorEvent) {
      console.error('Network Error', error.error.message);
      errormessage = `Network Error ${error.error.message}`;
    } else {
      console.error(`Backend returned code ${error.status},` + `body was: ${JSON.stringify(error.error.responseDescription)}`);
      if (error.statusText === 'Unknown Error') {
        errormessage = 'Seems you are offline. Connect to the internet and try again.';
      }
      errormessage = `${error.error.responseDescription || errormessage}`;
      console.log(errormessage);
    }
    console.log(errormessage);
    return throwError(errormessage);
  }

}
