import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { SessionService } from './session.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const api_url: string = environment.api_url;

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private sessionService: SessionService
  ) {}

  private formatError(error: any) {
    return Observable.throw(error.json());
  }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.sessionService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.sessionService.getToken()}`;
    }

    return new Headers(headersConfig);
  }

  public post(path: string, body: Object = {}): Observable<any> {

    const methodUrl = `${api_url}${path}`;
    const bodyString = JSON.stringify(body);
    const headers = { headers: this.setHeaders() };

    return this.http.post(methodUrl, bodyString, headers)
      .catch(this.formatError)
      .map((res: Response) => res.json());
  }

  public get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {

    const methodUrl = `${api_url}${path}`;
    const headers = { headers: this.setHeaders(), search: params };

    return this.http.get(methodUrl, headers)
      .catch(this.formatError)
      .map((res: Response) => res.json());
  }

  public put(path: string, body: Object = {}): Observable<any> {
    const methodUrl = `${api_url}${path}`;
    const bodyString = JSON.stringify(body);
    const headers = { headers: this.setHeaders() };

    return this.http.put(methodUrl, bodyString, headers)
      .catch(this.formatError)
      .map((res: Response) => res.json());
  }
}
