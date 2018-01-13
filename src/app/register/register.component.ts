import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModel } from '@angular/forms';

import { User } from '../shared/user/user';
import { UserService } from '../shared/user/user.service';
import { LandscapeComponent } from '../landscape/landscape.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  
  registerData = {}

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  post() {
    this.registerData['points'] = 0
    console.log(this.registerData)
    this.userService.registerUser(this.registerData)
  }

}
