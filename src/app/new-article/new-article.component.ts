import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleService } from '../shared/article/article.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewArticleComponent implements OnInit {

  articleData = {}
  message

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit() {

  }

  newArticle() {
    this.articleData['new'] = true
    this.articleService.newArticle(this.articleData).subscribe(message => {
      console.log(message)
      this.message = message
      this.router.navigate(['articles'])
    })
  }
}
