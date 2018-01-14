import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuestionService } from '../shared/question/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class QuestionsComponent implements OnInit {

  questions
  
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions
    });
  }
}
