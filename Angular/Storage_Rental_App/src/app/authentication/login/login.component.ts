import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onLogin(data: Login) {
    this.authService.login(data).subscribe(next => {
      console.log('Logged in successfully');
      console.log(next);
      this.router.navigateByUrl('/client');
    }, err => { throw err; } );
  }

}
