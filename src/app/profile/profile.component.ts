import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { LandscapeComponent } from '../landscape/landscape.component';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
