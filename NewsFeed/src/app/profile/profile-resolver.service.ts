import { Injectable } from '@angular/core';
import { ProfileService } from '../shared/services';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Profile } from '../shared/models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Profile | Observable<Profile> | Promise<Profile> {
    const username = route.params['username'];

    return this.profileService.getProfile(username)
      .catch((err) => {
        this.router.navigateByUrl('/');
        return Observable.throw(err);
      });
  }
}
