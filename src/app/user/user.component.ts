import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router' 

import { User } from '../shared/user/user';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  user

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.snapshot.params.id
    this.userService.getUser(id).subscribe(user => {
      this.user = user
    })
  }

}
