import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {
  
  private _questionsUrl = environment.apiUrl + '/api/questions'

  constructor(private _http: Http) { }

  getQuestions(): Observable<any> {
    return this._http.get(this._questionsUrl).map(res => res.json(), this.getRequestOptions())
  }

  private getRequestOptions() {
    const headers = new Headers()
    headers.append('x-access-token', localStorage.getItem('token'))
    const options = new RequestOptions({ headers: headers })
    return options
  }
  
}