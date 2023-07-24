import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BodyByKhoshalComponent } from './body-by-khoshal/body-by-khoshal.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path:'aboutUs',
        children: [
          {
            path:'body-by-khoshal',
            component: BodyByKhoshalComponent
          }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
