import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription, interval, switchMap } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

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
  @ViewChild('openPaymentApproveModel')
  openPaymentApproveModel?: TemplateRef<any>;
  shoppingCartId: number = 0;

  constructor(
    public authService: AuthService,
    private adminService: AdminService,
    public router: Router,
    private modalService: NgbModal,
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
  paymentApproved(StatusId) {
    if (this.shoppingCartId != 0) {
      var obj = {
        ShoppingCartId: this.shoppingCartId,
        StatusId: StatusId
      }
      this.adminService.paymentApproved(obj).subscribe({
        next:(res: any) => {
          this.shoppingCartId = 0;
          this.modalService.dismissAll();
          this.getAllCustomerPackages();
        }, error:(error: any) => {

        }
      });
    }
  }
  openModel(model) {
    this.modalService.open(model, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  deleteSelected() {
    Swal.fire({
      title: 'Are you sure want to approve ?',
      showCancelButton: true,
      confirmButtonColor: '#8963ff',
      cancelButtonColor: '#fb7823',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        
      }
    });
  }
}
