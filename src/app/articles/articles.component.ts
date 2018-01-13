import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ArticleService } from '../shared/article/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticlesComponent implements OnInit {

  message
  responseStatus
  articles

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles
    })
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
