import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ArticleService } from '../shared/article/article.service';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  currentId
  article = {
    question: '',
    articleText: '',
    correctAnswer: 0,
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    _id: 0
  }
  user
  selectedAnswer1: boolean = false
  selectedAnswer2: boolean = false
  selectedAnswer3: boolean = false
  selectedAnswer4: boolean = false
  message: String = ''
  correct

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService, private userService: UserService) { }

  ngOnInit() {
    this.userService.me().subscribe(user => {
      this.user = user
      this.redirectIfAlreadyAnswered()
    })
    let id = this.route.snapshot.params.id
    this.currentId = id;

    this.articleService.getArticleToday().subscribe(article => {
      this.articleService.currentArticle = article
      this.article = article
    })
  }

  redirectIfAlreadyAnswered() {
    const today = new Date()
    const dbDate = new Date(this.user.lastAnswer)
    if (this.isSameDate(today, dbDate)) {
      this.router.navigate(['/profile'])
    }
  }

  isSameDate(date1, date2) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
  }

  selectAnswer(answer) {
    this.selectedAnswer1 = false
    this.selectedAnswer2 = false
    this.selectedAnswer3 = false
    this.selectedAnswer4 = false
    if(answer == 1) {
      this.selectedAnswer1 = true
    }
    else if(answer == 2) {
      this.selectedAnswer2 = true
    }
    else if(answer == 3) {
      this.selectedAnswer3 = true
    }
    else {
      this.selectedAnswer4 = true
    }
    this.message = ''
  }

  submit() {
    if(this.selectedAnswer1) {
      this.correct = this.checkAnswer(1)
    }
    else if(this.selectedAnswer2) {
      this.correct = this.checkAnswer(2)
    }
    else if(this.selectedAnswer3) {
      this.correct = this.checkAnswer(3)
    }
    else if(this.selectedAnswer4){
      this.correct = this.checkAnswer(4)
    }
    else {
      this.message="Please select your answer."
      return
    }
    if(this.correct){
      this.user['points'] += 10
      //this.router.navigate(['article', {id: this.article.id, p2: this.correct }]); 
      this.userService.correctLastAnswer = true
    }
    else {
      this.userService.correctLastAnswer = false
    }
    this.user['lastAnswer'] = new Date()
    this.updateUser()
  }

  checkAnswer(i) {
    return this.article.correctAnswer == i
  }

  updateUser() {
    this.userService.updateUser(this.user, this.user._id).subscribe(message => {
      this.router.navigate(['/result'])
    })
  }

}
