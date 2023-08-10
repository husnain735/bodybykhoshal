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
  }
  saveChatForAdmin(obj: any){
    return this.apiService.post(`${this.pageUrl}saveChatForAdmin/`, obj);
  }
  readAllMessages(obj: any){
    return this.apiService.post(`${this.pageUrl}readAllMessages/`, obj);
  }
}
