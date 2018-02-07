import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SessionService } from './session.service';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private api: ApiService,
    private sessionService: SessionService
  ) {}

  private setAuth(user: User) {
    this.sessionService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  public populate(): Promise<any> {
    if (this.sessionService.getToken()) {
      return this.api.get('/user').toPromise()
        .then((data) => {
          this.setAuth(data.user);
        })
        .catch((err) => {
          this.purgeAuth();
        });
    } else {
      this.purgeAuth();
    }

    return new Promise((resolve, reject) => { resolve(); });
  }

  public authenticate(type: string, credentials: Object): Observable<User> {
    const user = { user: credentials };
    const path = type === 'login' ? '/users/login' : '/users';

    return this.api.post(path, user)
      .map(data => {
        this.setAuth(data.user);
        return data;
      });
  }

  public update(user: User): Observable<User> {
    return this.api.put('/user', {user})
      .map(data => {
        this.currentUserSubject.next(data.user);
        return data.user;
      });
  }

  public getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  public purgeAuth() {
    this.sessionService.destroyToken();
    this.currentUserSubject.next(new User);
    this.isAuthenticatedSubject.next(false);
  }
}
