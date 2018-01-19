import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch'

@Injectable()
export class UserService {

  private userChanged = new Subject<any>()
  private _registerUrl = environment.apiUrl + '/api/auth/register'
  private _loginUrl = environment.apiUrl + '/api/auth/login'
  private _logoutUrl = environment.apiUrl + '/api/auth/logout'
  private _verifyUrl = environment.apiUrl + '/api/auth/verify'
  private _usersUrl = environment.apiUrl + '/api/users'
  
  public user
  public userId
  public correctLastAnswer: boolean = false

  constructor(private _http: Http, private _httpClient: HttpClient, private router: Router) { }

  registerUser(registerData): Observable<any> {
    return this._http.post(this._registerUrl, registerData)
      .map(res => {
        this.router.navigate(['/login'])
        return { status: res.status }
      })
      .catch(error => Observable.of({ status: error.status, message: error._body }))
  }

  loginUser(loginData): Observable<any> {
    return this._httpClient.post<any>(this._loginUrl, loginData)
      .map(res => {
        localStorage.setItem('token', res.token)
        this.me().subscribe((user: any) => {
          this.user = user
          this.userId = user._id
          this.router.navigate(['/home'])
          this.sendUserChanged(user)
        })
        return { status: res.status }
      })
      .catch((error: HttpErrorResponse) => Observable.of({ status: error.status, message: error.error }))
  }

  logoutUser() {
    this._http.post(this._logoutUrl, {}).subscribe(res => {
      localStorage.removeItem('token')
      this.user = undefined
      this.userId = undefined
      this.router.navigate(['/login'])
      this.sendUserChanged(this.user)
    })
  }

  me() {
    return this._http.get(this._usersUrl + '/me', this.getRequestOptions())
      .map(res => {
        const user = res.json()
        this.user = user
        this.sendUserChanged(this.user)
        return user
      })
  }

  getUsers(): Observable<any> {
    return this._http.get(this._usersUrl, this.getRequestOptions()).map(res => res.json())
  }

  getUser(id): Observable<any> {
    return this._http.get(this._usersUrl + '/' + id, this.getRequestOptions()).map(res => res.json())
  }

  updateUser(userData, id) {
    return this._http.put(this._usersUrl + '/' + id, userData, this.getRequestOptions())
      .map(res => {
        this.user = userData
        this.sendUserChanged(userData)

        const status = res.status
        if (status === 204) {
            return 'User was successfully updated.'
        } else {
            return 'User was not updated.'
        }
      })
  }

  isAuthenticated(): Observable<boolean> {
    return this._http.get(this._verifyUrl, this.getRequestOptions())
      .map(res => res.status === 200)
      .catch(error => Observable.of(false))
  }

  sendUserChanged(user) {
    this.userChanged.next(user);
  }

  receiveUserChanged(): Observable<any> {
    return this.userChanged.asObservable();
  }

  private getRequestOptions() {
    const headers = new Headers()
    headers.append('x-access-token', localStorage.getItem('token'))
    const options = new RequestOptions({ headers: headers })
    return options
  }

}
