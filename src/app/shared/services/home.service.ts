import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  pageUrl = environment.ResourceServer.Endpoint + 'Home/';

  constructor(private apiService: ApiService) {}

  GetPackages(): Observable<any>{
    return this.apiService.get(`${this.pageUrl}GetPackages`);
  }
  GetPackage(PackageId: number){
    return this.apiService.get(`${this.pageUrl}GetPackage/${PackageId}`)
  }
  AddToCart(PackageId: number){
    return this.apiService.get(`${this.pageUrl}AddToCart/${PackageId}`)
  }
}
