import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class QuestionService {
  questions = []
  //private _questionUrl = './api/questions/questions.json';
  private _questionUrl = 'http://localhost:3000/questions'

  constructor(private _http: Http) { //     private _http: HttpClient
  }

  getQuestions() {
    this._http.get(this._questionUrl).subscribe(res => {
      this.questions = res.json()
      //console.log(res)
    })
  }
  
  /*
  getQuestions2(): Observable<IQuestion[]> {
    return this._http.get<IQuestion[]>(this._questionUrl)
      .do(data => console.log('ALL: '+ JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
  */

  /*
  getQuestions(): IQuestion[] {
    return [
      {
        "questionId": 1,
        "questionText": "text1",
        "questionAnswers": ["a1", "a2", "a3", "a4"],
        "questionRightAnswer": "a3"
      },
      {
        "questionId": 2,
        "questionText": "text2",
        "questionAnswers": ["a1", "a2", "a3", "a4"],
        "questionRightAnswer": "a3"
      },
      {
        "questionId": 3,
        "questionText": "text3",
        "questionAnswers": ["a1", "a2", "a3", "a4"],
        "questionRightAnswer": "a3"
      },
      {
        "questionId": 4,
        "questionText": "text4",
        "questionAnswers": ["a1", "a2", "a3", "a4"],
        "questionRightAnswer": "a3"
      }
    ];
  }
  */
  
}