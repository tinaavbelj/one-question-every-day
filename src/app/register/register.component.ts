import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModel } from '@angular/forms';

import { LandscapeComponent } from '../landscape/landscape.component';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  
  registerData = {
    username: '',
    email: '',
    password: ''
  }
  passwordConfirmation = ''
  errors = []

  constructor(private userService: UserService) { }

  ngOnInit() {
    
  }

  register() {
    this.errors = []

    if (this.registerData.username.length < 3) {
      this.errors.push('Username has to be at least 4 characters long')
    }

    if (this.registerData.email.length < 6) {
      this.errors.push('Email has to be at least 6 characters long')
    }

    if (this.registerData.password.length < 6) {
      this.errors.push('Password has to be at least 6 characters long')
    }

    if (this.registerData.password !== this.passwordConfirmation) {
      this.errors.push('Passwords do not match')
    }

    if (this.errors.length === 0) {
      this.userService.registerUser(this.registerData).subscribe(res => {
        if (res.status === 400 || res.status === 500) {
            this.errors.push(res.message)
        }
      })
    }
  }

}
