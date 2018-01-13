import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { QuestionService } from '../question/question.service';
import { LandscapeComponent } from '../landscape/landscape.component';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionDetailsComponent implements OnInit {

  currentId;

  constructor(private _route: ActivatedRoute, private _router: Router, private _questionService: QuestionService) { 

  }

  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('id');
    this.currentId = id;
    //this._questionService.getQuestions().subscribe(questions => this.questions = questions);
  }

  onBack(): void {
    this._router.navigate(['/admin-panel']);
  }
}
