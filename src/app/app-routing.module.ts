import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(x => x.HomeModule),
      },
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(x => x.AuthenticationModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin-routing.module').then(x => x.AdminRoutingModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
