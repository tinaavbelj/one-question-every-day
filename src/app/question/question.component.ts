import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionService } from '../shared/question/question.service';
import { LandscapeComponent } from '../landscape/landscape.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionComponent implements OnInit {

  constructor(private _questionService: QuestionService, private router: Router) { 

  }

  ngOnInit(): void {
    //this._questionService.getQuestions().subscribe(questions => this.questions = questions);
    this._questionService.getQuestions();
  }

  submit() {
    //this.router.navigate(['/question-details', this.questions[0].questionId]);
  }

}
