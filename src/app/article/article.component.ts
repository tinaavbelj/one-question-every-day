import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ArticleService } from '../shared/article/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {

  currentId
  article = {
    question: '',
    articleText: ''
  }

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id
    this.currentId = id;
    this.articleService.getArticle(this.currentId).subscribe(article => {
      this.article = article
    })
  }
}
