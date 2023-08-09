import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import {
  Facebook,
  Twitter,
  Github,
  Gitlab,
  User,
  Key,
  UserCheck,
  Mail,
  Phone
} from 'angular-feather/icons';
import { HeaderComponent } from './Components/header/header.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatBoxComponent } from './Components/chat-box/chat-box.component';
import { MaterialModule } from 'src/material/material.module';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

const icons = {
  Facebook,
  Twitter,
  Github,
  Gitlab,
  User,
  Key,
  UserCheck,
  Mail,
  Phone
};


@NgModule({
  declarations: [
    HeaderComponent,
    ChatBoxComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FeatherModule.pick(icons),
    NgScrollbarModule,
    NgbModule,
    MaterialModule,
    FullCalendarModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FeatherModule,
    HeaderComponent,
    NgScrollbarModule,
    NgbModule,
    ChatBoxComponent,
    MaterialModule,
    FullCalendarModule,
    CalendarComponent
  ]
})
export class SharedModule { }
