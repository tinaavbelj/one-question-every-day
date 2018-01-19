import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ArticleService } from '../shared/article/article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditArticleComponent implements OnInit {

  currentId
  article = {
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: 1,
    url: '',
    pdf: '',
    articleText: '',
    date: ''
  }
  pdfFile = null
  pdfFileRemoved = false
  message

  constructor(private router: Router, private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id
    this.currentId = id;
    this.articleService.getArticle(this.currentId).subscribe(article => {
      article.date = this.formatDate(article.date)
      this.article = article
    })
  }

  saveArticle() {
    this.articleService.updateArticle(this.article, this.pdfFile, this.currentId).subscribe(message => {
      this.message = message
      this.router.navigate(['/articles'])
    })
  }

  formatDate(date) {
    const newDate = new Date(date)
    const datePipe = new DatePipe('en-US')
    return datePipe.transform(new Date, 'yyyy-MM-dd')
  }

  handlePdf(file) {
    this.pdfFile = file
  }

}
