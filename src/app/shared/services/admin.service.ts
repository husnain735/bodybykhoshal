import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  pageUrl = environment.ResourceServer.Endpoint + 'Admin/';

  constructor(private apiService: ApiService) {}

  GetAllCustomers(): Observable<any>{
    return this.apiService.get(`${this.pageUrl}GetAllCustomers`);
  }
  GetAdminChatWithCustomer(obj: any){
    return this.apiService.post(`${this.pageUrl}GetAdminChatWithCustomer/`, obj);
    return null;
  }
  saveChatForAdmin(obj: any){
    return this.apiService.post(`${this.pageUrl}saveChatForAdmin/`, obj);
  }
  readAllMessages(obj: any){
    return this.apiService.post(`${this.pageUrl}readAllMessages/`, obj);
  }
  getCustomersBookings(): Observable<any>{
    return this.apiService.get(`${this.pageUrl}getCustomersBookings`);
  }
  approveAndRejectBooking(obj: any){
    return this.apiService.post(`${this.pageUrl}approveAndRejectBooking/`, obj);
  }
  getAllCustomerPackages(): Observable<any>{
    return this.apiService.get(`${this.pageUrl}getAllCustomerPackages`);
  }
  paymentApproved(obj: any){
    return this.apiService.post(`${this.pageUrl}paymentApproved/`, obj);
  }
}
