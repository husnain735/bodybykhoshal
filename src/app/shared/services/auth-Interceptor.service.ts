import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { TokenExpirationService } from './token-expiration.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private tokenExpirationService: TokenExpirationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      return this.tokenExpirationService.getTokenExpirationCheckObservable().pipe(
        take(1),
        switchMap(() => {
          if (this.authService.isTokenExpired(token)) {
            this.authService.removeAuthToken();
          }
          return next.handle(request);
        })
      );
    }
    return next.handle(request);
  }
}
