import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Obtem o token da sessão para utilizar nas requisições
   */
  public getOptions(): any {
    // tratar caso tenha o token

    const TOKEN = 'Bearer ' + localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: TOKEN,
      }),
      observe: 'response' as 'response',
    };
  }

  /**
   * Generic GET Method
   * @param path URL path
   */
  public get(path: string): Observable<any> {
    return this.httpClient
      .get(path, this.getOptions())
      .pipe(catchError((e: any) => throwError(e)));
  }

  /**
   * Generic POST Method
   * @param path URL path
   * @param body Request body
   */
  public post(path: string, body: any): Observable<any> {
    return this.httpClient
      .post(path, JSON.stringify(body), this.getOptions())
      .pipe(catchError((e: any) => throwError(e)));
  }

  /**
   * Generic PUT Method
   * @param path URL path
   * @param body Request body
   */
  public put(path: string, body: any): Observable<any> {
    return this.httpClient
      .put(path, JSON.stringify(body), this.getOptions())
      .pipe(catchError((e: any) => throwError(e)));
  }

  /**
   * Generic PATCH Method
   * @param path URL path
   * @param body Request body
   */
  public patch(path: string, body: any): Observable<any> {
    return this.httpClient
      .patch(path, JSON.stringify(body), this.getOptions())
      .pipe(catchError((e: any) => throwError(e)));
  }

  /**
   * Generic DELETE Method
   * @param path URL path
   */
  public delete(path: string): Observable<any> {
    return this.httpClient
      .delete(path, this.getOptions())
      .pipe(catchError((e: any) => throwError(e)));
  }
}
