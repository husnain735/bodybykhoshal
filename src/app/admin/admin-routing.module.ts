import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminPackagesComponent } from './admin-packages/admin-packages.component';
import { AdminBookingComponent } from '../admin-booking/admin-booking.component';
import { PackagesComponent } from './packages/packages.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path:'',
        component: AdminBookingComponent
      },
      {
        path:'customer-packages',
        component: AdminPackagesComponent
      },
      {
        path:'packages',
        component: PackagesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
