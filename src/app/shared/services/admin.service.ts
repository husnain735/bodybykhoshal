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
}
