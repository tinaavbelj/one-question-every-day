import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { UserService } from '../shared/user/user.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NavigationComponent implements OnInit {

  @Input() navigation
  @Output() navigationEvent = new EventEmitter<boolean>()

  private onUserChangedSubscription: Subscription;

  user

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.user
    
    this.onUserChangedSubscription = this.userService.receiveUserChanged().subscribe(user => {
      this.user = user
    })
  }

  clickedLink() {
    this.navigation = false
    this.navigationEvent.emit(this.navigation)
  }

  logout() {
    this.userService.logoutUser()
    this.clickedLink()
  }

}
