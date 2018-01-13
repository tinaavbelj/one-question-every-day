import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuestionService } from '../question/question.service';
import { ArticleService } from '../shared/article/article.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AdminPanelComponent implements OnInit {
 
  constructor(private articleService: ArticleService) { 
  }

  ngOnInit() {
    this.articleService.getArticles()
    /*this.questions = this._questionService.getQuestions();*/
    //this._questionService.getQuestions().subscribe(questions => this.questions = questions);
  }
}
