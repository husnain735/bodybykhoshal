import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  
  constructor(private adminService: AdminService) {
     
  }

  ngOnInit() {
    this.GetAllCustomers()
  }

  GetAllCustomers() {
    this.adminService.GetAllCustomers().subscribe({
      next: (res: any) => {

      }, error: (error: any) => {

      }
    })
  }
}
