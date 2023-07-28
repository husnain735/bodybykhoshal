import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { BodyByKhoshalComponent } from './body-by-khoshal/body-by-khoshal.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { PackagesComponent } from './packages/packages.component';


@NgModule({
  declarations: [
    HomeComponent,
    BodyByKhoshalComponent,
    AddToCartComponent,
    PackagesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
