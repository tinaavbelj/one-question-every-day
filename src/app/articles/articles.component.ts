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
      this.articles = articles
    })
  }

}
