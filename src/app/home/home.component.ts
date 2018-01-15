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
    })
    let id = this.route.snapshot.params.id
    this.currentId = id;
    this.user = this.userService.user

    this.articleService.getArticles().subscribe(articles => {
      this.article = articles[articles.length - 1]
      this.articleService.currentArticle = this.article
    })
    
    this.articleService.getArticleToday().subscribe(article => {
      this.articleService.currentArticle = article
      this.article = article
    })
    

    this.redirectIfAlreadyAnswered()
  }

  redirectIfAlreadyAnswered() {
    console.log('last answer user')
    console.log('date now')
    const today = new Date()
    const dbDate = new Date(this.userService.user.lastAnswer)
    console.log(today)
    console.log(dbDate)
    if (this.isSameDate(today, dbDate)) {
      this.router.navigate(['profile'])
    }
  }

  isSameDate(date1, date2) {
    console.log(date1)
    console.log(date2)
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
      this.updatePoints(10);
      //this.router.navigate(['article', {id: this.article.id, p2: this.correct }]); 
      this.userService.correctLastAnswer = true
    }
    else {
      this.userService.correctLastAnswer = false
    }
    this.updateLastAnswerDate()
    this.router.navigate(['result'])
  }

  checkAnswer(i) {
    if(this.article.correctAnswer == i) {
      return true
    }
    return false
  }
  
  updatePoints(points) {
    this.user['points'] += points
    this.userService.updateUser(this.user, this.user._id).subscribe(message => {
      console.log(message)
    })
  }

  updateLastAnswerDate() {
    this.user['lastAnswer'] = Date.now()
    console.log('answer')
    console.log(this.user['lastAnswer'])
    this.userService.updateUser(this.user, this.user._id).subscribe(message => {
      console.log(message)
    })
  }
}
