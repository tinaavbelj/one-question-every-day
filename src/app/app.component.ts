import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { UserService } from "./shared/user/user.service"
import { User } from "./shared/user/user"
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private onUserChangedSubscription: Subscription;
  title = 'app'
  user: User
  isLoggingIn = true
  state: string = 'small'
  public navigation: boolean = false
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.isAuthenticated().subscribe(success => {
      if (success) {
        this.userService.me().subscribe(user => {
          this.user = user
        })
      }
    })

    this.onUserChangedSubscription = this.userService.receiveUserChanged().subscribe(user => {
      this.user = user
    })
  }

  toggleNavigation() {
    this.navigation = !this.navigation
  }

  receiveClickedLink($event) {
    this.navigation = $event
  }
  
}
