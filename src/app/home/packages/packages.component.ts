import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/shared/services/home.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  showNavigationArrows = true;
  showNavigationIndicators = true;
  images = [
    {
      src: '../../../assets/images/jpeg/main-banner5.jpg',
    },
    {
      src: '../../../assets/images/jpeg/main-banner21.jpg',
    },
    {
      src: '../../../assets/images/jpeg/main-banner4.jpg',
    },
  ];
  packages: any[] = [];

  constructor(private homeService: HomeService,private router: Router) {}

  ngOnInit() {
    this.GetPackages();
  }

  GetPackages() {
    this.homeService.GetPackages().subscribe({
      next: (res: any) => {
        this.packages = res.body;
      },
      error: (error: any) => {},
    });
  }
  navigateToAddToCart(PackageId){
    localStorage.setItem('PackageId', PackageId);
    this.router.navigate(['/home/add-to-cart/' + PackageId]);
  }
}
