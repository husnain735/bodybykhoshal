// token-expiration.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenExpirationService {
  private readonly TOKEN_KEY = 'auth_token';
  private timerInterval = 1000; // Check every second (adjust as needed)
  private tokenExpirationCheck$: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  constructor() {
    this.startExpirationCheck();
  }

  private startExpirationCheck() {
    setInterval(() => {
      this.tokenExpirationCheck$.next(null);
    }, this.timerInterval);
  }

  getTokenExpirationCheckObservable() {
    return this.tokenExpirationCheck$.asObservable();
  }
}
