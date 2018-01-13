import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class NavigationComponent implements OnInit {

  @Input() navigation
  @Output() navigationEvent = new EventEmitter<boolean>()

  constructor(private userService: UserService) { }

  ngOnInit() {
    
  }

  clickedLink() {
    this.navigation = false
    this.navigationEvent.emit(this.navigation)
  }

}
