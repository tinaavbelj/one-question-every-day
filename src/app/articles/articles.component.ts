import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ArticleService } from '../shared/article/article.service';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticlesComponent implements OnInit {

  user
  articles
  message

  constructor(private articleService: ArticleService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.me().subscribe(user => {
      this.user = user
    })
    this.refreshArticles()
  }

  deleteArticle(articleId) {
    this.articleService.deleteArticle(articleId).subscribe(message => {
      this.message = message
      this.refreshArticles()
    })
  }

  refreshArticles() {
    this.articleService.getArticles().subscribe(articles => {
      const today = new Date()
      const lastAnswerDate = new Date(this.user.lastAnswer)
      if (!this.user.admin && !this.isSameDate(today, lastAnswerDate)) {
        articles = articles.filter(article => {
          const articleDate = new Date(article.date)
          return !this.isSameDate(today, articleDate)
        })
      }
      this.articles = articles
    })
  }

  isSameDate(date1, date2) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
  }

}
