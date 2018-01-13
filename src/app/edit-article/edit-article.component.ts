import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
    articleText: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: 1
  }
  message

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id
    this.currentId = id;
    this.articleService.getArticle(this.currentId).subscribe(data => {
      this.article = data
      console.log(this.article)
    })
  }

  saveArticle() {
    this.articleService.editArticle(this.article, this.currentId).subscribe(message => {
      console.log(message)
      this.message = message
    })
    this.router.navigate(['articles'])
  }
}
