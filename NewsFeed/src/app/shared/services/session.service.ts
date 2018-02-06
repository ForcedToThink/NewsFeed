import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  private sessionTokenName = 'newsFeedSessionToken';

  public getToken(): string {
    return window.localStorage[this.sessionTokenName];
  }

  public saveToken(token: string): void {
    window.localStorage[this.sessionTokenName] = token;
  }

  public destroyToken(): void {
    window.localStorage.removeItem(this.sessionTokenName);
  }
}
