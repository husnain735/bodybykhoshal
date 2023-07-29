import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/shared/services/home.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {

  PackageId: number;
  package: any;


  constructor(private homeService: HomeService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    localStorage.removeItem('PackageId');
    this.activatedRoute.params.subscribe((params) => {
      if (params["id"] != null) {
        this.PackageId = Number(params["id"]);
        if (this.PackageId != undefined && this.PackageId > 0) {
          this.GetPackage();
        }
      }
    });
    
  }

  GetPackage() {
    this.package = new Object();
    this.homeService.GetPackage(this.PackageId).subscribe({
      next:(res:any) => {
        this.package = res.body
      }, error:(error) => {

      }
    });
  }

  AddToCart() {
    this.homeService.AddToCart(this.PackageId).subscribe({
      next:(res:any) => {
        
      }, error:(error) => {

      }
    });
  }
}
