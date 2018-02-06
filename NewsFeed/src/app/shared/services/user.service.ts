import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../index';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private api: ApiService
  ) {}

  private setAuth(user: User) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
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

  public getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}
