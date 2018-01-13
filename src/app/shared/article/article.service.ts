import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
    private articlesUrl = 'http://localhost:3000/articles'

    articles = []
    currentArticle
    responseStatus

    constructor (private _http: Http) {}

    getArticles(): Observable<any> {
        return this._http.get(this.articlesUrl).map(res => res.json())
    }

    saveCurrentArticle() {
        this._http.get(this.articlesUrl).subscribe(res => {
            this.currentArticle = res.json()[0]
        })
    }

    newArticle(articleData): Observable<string> {
        return this._http.post(this.articlesUrl, articleData)
            .map(res => {
                const status = res.status
                if (status === 201) {
                    return 'Article was successfully created.'
                } else {
                    return 'Article was not created.'
                }
            })
    }

    getArticle(id): Observable<any> {
        return this._http.get(this.articlesUrl + '/' + id).map(res => res.json())
    }

    editArticle(articleData, id): Observable<string> {
        return this._http.put(this.articlesUrl + '/' + id, articleData, {})
            .map(res => {
                const status = res.status
                if (status === 204) {
                    return 'Article was successfully updated.'
                } else {
                    return 'Article was not updated.'
                }
            })
    }

    deleteArticle(id): Observable<string> {
        return this._http.delete(this.articlesUrl + '/' + id)
            .map(res => {
                const status = res.status
                if (status === 204) {
                    return 'Article was successfully deleted.'
                } else {
                    return 'Article was not deleted.'
                }
            })
    }

    getArticleForToday(): Observable<any> {
        return this._http.get(this.articlesUrl).map(res => {
            res.json()
        })
    }
}