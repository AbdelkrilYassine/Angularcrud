import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private authenticationService:AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("ErrorInterceptorService");
    return next.handle(request).pipe(catchError(err => {    
      if (err.status === 401) {
          this.authenticationService.logout();
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
  }))
  }
}
