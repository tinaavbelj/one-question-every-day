import { Injectable } from "@angular/core"
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { User } from "./user";

@Injectable()
export class UserService {

  private _registerUrl = 'http://localhost:3000/register'
  private _loginUrl = 'http://localhost:3000/login'
  private _usersUrl = 'http://localhost:3000/users'
  private _userUrl = 'http://localhost:3000/user/'
  public userId
  public user
  public correctLastAnswer: boolean = false

  users = []

    constructor(private _http: Http, private _httpClient: HttpClient, private router: Router) { //     private _http: HttpClient
    }

    registerUser(registerData) {
      this._http.post(this._registerUrl, registerData).subscribe(res => {
       this.router.navigate(['/login'])
      })
    }

    loginUser(loginData) {
      this._httpClient.post<any>(this._loginUrl, loginData).subscribe(res => {
        localStorage.setItem('token', res.token)
        this.userId = res.user._id
        this.user = res.user
       })
    }

    getUsers() {
      this._http.get(this._usersUrl).subscribe(res => {
        this.users = res.json()
      })
    }

    getUser(id) {
      return this._http.get(this._userUrl + id)
    }

    updateUser(data, id) {
      console.log('data')
      console.log(data)
      return this._http.put(this._usersUrl + '/' + id, data, {})
        .map(res => {
            const status = res.status
            if (status === 204) {
                return 'User was successfully updated.'
            } else {
                return 'User was not updated.'
            }
        })
    }
}