import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.me().mergeMap(user => {
            const isAdmin = user.admin
            if (isAdmin) {
                return Observable.of(true)
            } else {
                this.router.navigate(['/home'])
                return Observable.of(false)
            }
        })
    }

}
