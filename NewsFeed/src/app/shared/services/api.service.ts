import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const api_url: string = environment.api_url;

@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  private formatError(error: any) {
    return Observable.throw(error.json());
  }

  private setHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }
  public post(path: string, body: Object = {}): Observable<any> {

    const methodUrl = `${api_url}${path}`;
    const bodyString = JSON.stringify(body);
    const headers = { headers: this.setHeaders() };

    return this.http.post(methodUrl, bodyString, headers)
      .catch(this.formatError)
      .map((res: Response) => res.json());
  }
}
