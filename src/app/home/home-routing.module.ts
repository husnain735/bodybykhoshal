import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BodyByKhoshalComponent } from './body-by-khoshal/body-by-khoshal.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { PackagesComponent } from './packages/packages.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PackagesComponent,
      },
      {
        path: 'add-to-cart/:id',
        component: AddToCartComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'customer-dashboard',
        component: CustomerDashboardComponent,
        canActivate:[AuthGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
