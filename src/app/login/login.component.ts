import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../shared/user/user';
import { UserService } from '../shared/user/user.service';
import { LandscapeComponent } from '../landscape/landscape.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  title = 'app';
  loginData = {
    email: '',
    password: ''
  }
  errors = []
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    
  }

  login() {
    this.errors = []

    if (this.loginData.email.length < 6) {
      this.errors.push('Email has to be at least 6 characters long')
    }

    if (this.loginData.password.length < 6) {
      this.errors.push('Password has to be at least 6 characters long')
    }

    if (this.errors.length === 0) {
      this.userService.loginUser(this.loginData).subscribe(res => {
        if (res.status === 401 || res.status === 404) {
            this.errors.push(res.message)
        }
      })
    }
  }

  register() {
    this.router.navigate(['/register'])
  }

}
