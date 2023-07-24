import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AuthenticationComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class AuthenticationModule { }
