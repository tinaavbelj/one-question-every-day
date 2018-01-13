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

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  user

  ngOnInit() {
    var id = this.route.snapshot.params.id
    console.log(id)
    this.userService.getUser(id).subscribe(data => {
      this.user = data.json()
      console.log(data)
    })
  }

}
