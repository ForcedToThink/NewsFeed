import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TagsService {
  constructor(
    private api: ApiService
  ) {}

  public getTags() {
    return this.api.get('tags')
      .map((data) => data.tags);
  }
}
