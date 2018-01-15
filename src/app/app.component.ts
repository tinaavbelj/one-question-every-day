import { Component, OnInit } from '@angular/core';

import { UserService } from "./shared/user/user.service";
import { User } from "./shared/user/user";
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'app'
  user: User
  isLoggingIn = true
  state: string = 'small'
  public navigation: boolean = false
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.me().subscribe( res => {
      this.user = res
    })
  }

  toggleNavigation() {
    this.navigation = !this.navigation
  }

  receiveClickedLink($event) {
    this.navigation = $event
  }
  
}
