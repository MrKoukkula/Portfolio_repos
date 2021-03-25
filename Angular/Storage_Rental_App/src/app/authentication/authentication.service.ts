import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = 'https://localhost:44318/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken;

  token: string;

  constructor(private http: HttpClient, private router: Router) { }

  login(model: Login) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((x: any) => {
        const user = x;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
        return true;
      }),
      catchError(err => {
        console.log(err);
        throw err;
      })
    );
  }

  register(model: Register) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
    this.router.navigateByUrl('/');
  }

}
