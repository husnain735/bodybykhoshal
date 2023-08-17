import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription, interval, switchMap } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-packages',
  templateUrl: './admin-packages.component.html',
  styleUrls: ['./admin-packages.component.scss'],
})
export class AdminPackagesComponent implements OnInit {
  private customerSubscription: Subscription;
  isAdminChat = false;
  userProfiles: any[] = [];
  UserNameInChat: string;
  selectedUserGuid: string;
  isFormOpen = false;
  packages: any[] = [];
  @ViewChild('table') table!: DatatableComponent;
  scrollBarHorizontal = window.innerWidth < 1200;
  reorderable = true;
  loadingIndicator = true;


  constructor(
    public authService: AuthService,
    private adminService: AdminService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.getAllCustomerPackages();
  }

  getAllCustomerPackages() {
    this.adminService.getAllCustomerPackages().subscribe({
      next:(res: any) => {
        this.packages = res.body;
      }, error:(error: any) => {

      }
    })
  }
  paymentApproved(packageObj) {

  }
 
}
