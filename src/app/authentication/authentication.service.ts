import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { JwtResponse } from 'src/app/authentication/jwt-response';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject }    from 'rxjs';
import { mapTo } from 'rxjs/internal/operators/mapTo';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private url="http://localhost:8080/signin";

  private userStateSource = new Subject<boolean>();
  userState=this.userStateSource.asObservable();

  login(user:User) {
    return this.http.post<any>(this.url, user)
      .pipe(
        tap(jwtResponse => this.doLoginUser(jwtResponse)),
        mapTo(true),
        catchError(error => {
          this.userStateSource.next(false);
          return of(false);
        }));
  }

  private doLoginUser(jwtResponse){
    let tokenStr= 'Bearer '+jwtResponse.accessToken;
    localStorage.setItem('token', tokenStr);
    this.userStateSource.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.userStateSource.next(false);
  }

  isUserLoggedIn() {
    let token = localStorage.getItem('token')
    if(token == null){
      this.userStateSource.next(false);
      return false;
    }else{
      this.userStateSource.next(true);
      return true;
    }
  }
}
