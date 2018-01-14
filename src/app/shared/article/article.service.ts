import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
    
    private _articlesUrl = environment.apiUrl + '/api/articles'

    public currentArticle

    constructor (private _http: Http) { }

    createArticle(articleData, pdfFile): Observable<string> {
        let formData : FormData = new FormData()
        formData.append('data', JSON.stringify(articleData))
        if (pdfFile) {
            formData.append('pdf', pdfFile, pdfFile.name)
        }
        return this._http.post(this._articlesUrl, formData, this.getRequestOptions())
            .map(res => {
                const status = res.status
                if (status === 201) {
                    return 'Article was successfully created.'
                } else {
                    return 'Article was not created.'
                }
            })
    }

    getArticles(): Observable<any> {
        return this._http.get(this._articlesUrl, this.getRequestOptions()).map(res => res.json())
    }

    getArticle(id): Observable<any> {
        return this._http.get(this._articlesUrl + '/' + id, this.getRequestOptions()).map(res => res.json())
    }

    updateArticle(articleData, pdfFile, id): Observable<string> {
        let formData : FormData = new FormData()
        formData.append('data', JSON.stringify(articleData))
        if (pdfFile) {
            formData.append('pdf', pdfFile, pdfFile.name)
        }
        return this._http.put(this._articlesUrl + '/' + id, formData, this.getRequestOptions())
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
        return this._http.delete(this._articlesUrl + '/' + id, this.getRequestOptions())
            .map(res => {
                const status = res.status
                if (status === 204) {
                    return 'Article was successfully deleted.'
                } else {
                    return 'Article was not deleted.'
                }
            })
    }

    private getRequestOptions() {
        const headers = new Headers()
        headers.append('x-access-token', localStorage.getItem('token'))
        const options = new RequestOptions({ headers: headers })
        return options
      }
}
