import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { User } from '../shared/user/user';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeaderboardComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
    console.log(this.userService.getUsers())
  }

}
