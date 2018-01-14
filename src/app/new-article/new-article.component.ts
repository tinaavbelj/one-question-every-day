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

  articleData = {
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: '',
    url: '',
    articleText: ''
  }
  pdfFile = null
  message

  constructor(private router: Router, private articleService: ArticleService) { }

  ngOnInit() {

  }

  createArticle() {
    this.articleData['new'] = true
    this.articleService.createArticle(this.articleData, this.pdfFile).subscribe(message => {
      this.message = message
      this.router.navigate(['/articles'])
    })
  }

  handlePdf(file) {
    this.pdfFile = file
  }
  
}
