import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("JwtInterceptorService");
      
     let currentToken = localStorage.getItem('token');
    if (currentToken) {
        request = request.clone({
            setHeaders: {
                Authorization: `${currentToken}`
            }
        });
    }
    return next.handle(request);
}
}
