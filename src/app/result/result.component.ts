import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  newPoints = 120
  pointsMessage: String = ''
  newPointsMessage: String = ''
  correct: boolean = true
  wrong = false

  constructor(private articleService: ArticleService, private userService: UserService) { }

  ngOnInit() {
    this.correct = this.userService.correctLastAnswer
    if(this.correct) {
      this.correctMessage = 'Correct answer!'
      this.pointsMessage = 'You get ' + this.points + ' points.'
      this.newPointsMessage = 'Your new score is ' + this.userService.user.points +'.'
    }
    else {
      this.correctMessage = 'Wrong answer...'
      this.wrong = true
    }
  }

}
