import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Profile } from '../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  constructor(
    private api: ApiService
  ) {}

  public getProfile(username: string): Observable<Profile> {
    return this.api.get(`/profiles/${username}`)
    .map((data) => data.profile);
  }

  public follow(username: string): Observable<Profile> {
    return this.api.post(`/profiles/${username}/follow`)
      .map((data) => data.profile);
  }

  public unfollow(username: string): Observable<Profile> {
    return this.api.delete(`/profiles/${username}/follow`)
      .map((data) => data.profile);
  }
}
