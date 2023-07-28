import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BodyByKhoshalComponent } from './body-by-khoshal/body-by-khoshal.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { PackagesComponent } from './packages/packages.component';

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
      },
      // {
      //   path:'aboutUs',
      //   children: [
      //     {
      //       path:'body-by-khoshal',
      //       component: BodyByKhoshalComponent
      //     }
      //   ]
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
