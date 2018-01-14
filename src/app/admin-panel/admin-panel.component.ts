import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ArticleService } from '../shared/article/article.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AdminPanelComponent implements OnInit {

  articles
 
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles
    })
  }
}
