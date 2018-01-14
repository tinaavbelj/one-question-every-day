import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  } from '@angular/router';

import { LandscapeComponent } from '../landscape/landscape.component';
import { QuestionService } from '../shared/question/question.service';


@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionDetailsComponent implements OnInit {

  currentId
  questions

  constructor(private router: Router, private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.currentId = id;
    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions
    });
  }

  onBack(): void {
    this.router.navigate(['/admin-panel']);
  }
}
