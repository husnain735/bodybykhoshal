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
    return this.apiService.get(`${this.pageUrl}GetPackage/${PackageId}`);
  }
  AddToCart(PackageId: number){
    return this.apiService.get(`${this.pageUrl}AddToCart/${PackageId}`);
  }
  GetChatWithAdmin(){
    return this.apiService.get(`${this.pageUrl}GetChatWithAdmin`);
  }
  saveChat(obj: any){
    return this.apiService.post(`${this.pageUrl}saveChat/`, obj);
  }
  getCustomerNotification(){
    return this.apiService.get(`${this.pageUrl}getCustomerNotification`);
  }
  readAllMessages(){
    return this.apiService.get(`${this.pageUrl}readAllMessages`);
  }
  getCustomerBookings(){
    return this.apiService.get(`${this.pageUrl}getCustomerBookings`);
  }
  saveCustomerBooking(obj: any){
    return this.apiService.post(`${this.pageUrl}saveCustomerBooking/`, obj);
  }
  GetCustomerPackage(){
    return this.apiService.get(`${this.pageUrl}GetCustomerPackage`);
  }
}
