import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { UserService } from '../shared/user/user.service';
import { User } from '../shared/user/user';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeaderboardComponent implements OnInit {

  users

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users
    })
  }

}
