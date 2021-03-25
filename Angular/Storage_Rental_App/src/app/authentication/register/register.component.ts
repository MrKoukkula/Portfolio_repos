import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/client/client.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Register } from 'src/app/interfaces/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel: Register = {
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    StreetAddress: null,
    Postal: null,
    VATnumber: null,
    CompanyName: null,
    Password: ''
  };

  loginModel: Login = {
    Phone: '',
    Password: ''
  };

  registerForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthenticationService, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(form => {
      this.registerModel.Password = form.password;
    });
  }

  registerUser() {
    for (const key in this.clientService.currentUser) {
      if (this.clientService.currentUser.hasOwnProperty(key)) {
        this.registerModel[key] = this.clientService.currentUser[key];
      }
    }

    if (this.checkPasswordIsSame(this.registerModel.Password, this.registerForm.get('passwordRepeat').value)) {
      console.log('Passwords match, proceed');
      this.authService.register(this.registerModel).subscribe(next => {
        console.log('Registered successfully');
        this.router.navigateByUrl('/authentication');
        /* this.loginModel.Phone = this.registerModel.Phone;
        this.loginModel.Password = this.registerModel.Password;
        this.authService.login(this.loginModel).subscribe(() => {
          console.log('login successful, going to client');
          this.router.navigateByUrl('/client');
        }); */
      }, err => { throw err; });
    } else {
      console.log('Passwords do not match, denied');
      // TODO: make a better validation check
    }
  }

  checkPasswordIsSame(password, passwordRepeat) {
    if (password === passwordRepeat) {
      return true;
    }
    return false;
  }

}
