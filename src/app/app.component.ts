import { Component } from '@angular/core';

import { QuestionService } from './question/question.service';
import { User } from "./shared/user/user";
import { UserService } from "./shared/user/user.service";
import { ArticleService } from "./shared/article/article.service";
//import { QuestionService } from "./shared/article/article.service";
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ QuestionService, UserService, ArticleService ]
})
export class AppComponent {
  title = 'app'
  user: User
  isLoggingIn = true
  state: string = 'small'
  public navigation: boolean = false
  
  constructor(private userService: UserService) {
    this.user = new User()
  }

  toggleNavigation() {
    this.navigation = !this.navigation
  }

  receiveClickedLink($event) {
    this.navigation = $event
  }
}
