import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ArticleService } from '../shared/article/article.service';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultComponent implements OnInit {

  correctMessage
  points = 10
  pointsMessage = ''
  newPointsMessage = ''
  correct = true
  wrong = false
  currentArticle

  constructor(private articleService: ArticleService, private userService: UserService) { }

  ngOnInit() {
    this.userService.me().subscribe(user => {
      this.currentArticle = this.articleService.currentArticle
      this.correct = this.userService.correctLastAnswer
      
      if (this.correct) {
        this.correctMessage = 'Correct answer!'
        this.pointsMessage = 'You get ' + this.points + ' points.'
        this.newPointsMessage = 'Your new score is ' + user.points +'.'
      }
      else {
        this.correctMessage = 'Wrong answer...'
        this.wrong = true
      }
    })
  }

}
