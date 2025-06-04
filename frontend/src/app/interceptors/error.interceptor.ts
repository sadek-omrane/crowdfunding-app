import { HttpErrorResponse } from '@angular/common/http';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let _snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = error.error.message || error.message;
      _snackBar.openFromComponent(ErrorMessageComponent, {
        data: message,
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return throwError(error);
    })
  );
}
