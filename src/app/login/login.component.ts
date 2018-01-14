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
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userService.loginUser(this.loginData)
  }

  register() {
    this.router.navigate(['/register'])
  }

}
