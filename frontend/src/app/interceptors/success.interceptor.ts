import { HttpResponse } from '@angular/common/http';
import { HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, tap } from 'rxjs';
import { SuccessMessageComponent } from '../components/success-message/success-message.component';

export function successInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let _snackBar = inject(MatSnackBar);
  if(req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE'){
    return next(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
          let message = event.body['message'];
          if(message === undefined){
            _snackBar.openFromComponent(SuccessMessageComponent, {
              data: message,
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        }
      })
    );
  }
  return next(req);
}

