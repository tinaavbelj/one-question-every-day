import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ArticleService } from '../shared/article/article.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class QuestionsComponent implements OnInit {


  
  constructor(private _articleService: ArticleService) { 
  }

  ngOnInit() {
    /*this.questions = this._questionService.getQuestions();*/
    //this._questionService.getQuestions().subscribe(questions => this.questions = questions);
  }
}
