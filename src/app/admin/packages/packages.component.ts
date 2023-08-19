import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  packages: any[] = [];
  scrollBarHorizontal = window.innerWidth < 1200;
  reorderable = true;
  PackageForm: UntypedFormGroup;
  IsEdit = false;
  PackageId: number = 0;

  constructor(private _adminService: AdminService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder) {

  }
  ngOnInit() {
    this.PackageForm = this.fb.group({
      PackagesId: [0],
      TotalNumberOfSessions: [null,[Validators.required]],
      PricePerSession: [null,[Validators.required]],
      TotalPrice: [],
      Description: [''],
      PackageName: ['', [Validators.required]],
      OrderId: [null,[Validators.required]],
    });
    this.GetPackages();
  }

  GetPackages() {
    this._adminService.GetPackages().subscribe({
      next: (res: any) => {
        this.packages = res.body;
      }, error: (error: any) => {

      }
    });
  }
  openModel(temp) {
    this.modalService.open(temp, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  SavePackage(){
    var totalPrice = this.PackageForm.value.TotalNumberOfSessions * this.PackageForm.value.PricePerSession;
    this.PackageForm.get('TotalPrice').setValue(totalPrice);
    this._adminService.SavePackage(this.PackageForm.value).subscribe({
      next:(res: any) => {
        this.PackageForm.reset();
        this.modalService.dismissAll();
        this.GetPackages();
      },error:(error: any) => {

      }
    })
  }
  PatchPackagesForm(packageObj){
    this.PackageForm.patchValue({
      PackagesId: packageObj.packagesId,
      TotalNumberOfSessions: packageObj.totalNumberOfSessions,
      PricePerSession: packageObj.pricePerSession,
      TotalPrice: packageObj.totalPrice,
      Description: packageObj.description,
      PackageName: packageObj.packageName,
      OrderId: packageObj.orderId,
    })
  }
  editPackage(packageObj,temp) {
    this.IsEdit = true;
    this.PatchPackagesForm(packageObj);
    this.openModel(temp);
  }
  DeletePackage(){
    if (this.PackageId > 0) {
      this._adminService.DeletePackage(this.PackageId).subscribe({
        next:(res: any) => {
          this.PackageId = 0;
          this.GetPackages();
          this.modalService.dismissAll();
        },error:(error: any) => {

        }
      });
    }
  }
}
