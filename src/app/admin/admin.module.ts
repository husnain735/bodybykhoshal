import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminPackagesComponent } from './admin-packages/admin-packages.component';
import { AdminBookingComponent } from '../admin-booking/admin-booking.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminPackagesComponent,
    AdminBookingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
