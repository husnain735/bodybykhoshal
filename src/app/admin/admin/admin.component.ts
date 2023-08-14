import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval, switchMap } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isFormOpen = false;
  userProfiles: any[] = [];
  isAdminChat = false;
  selectedUserGuid: string;
  UserNameInChat: string;
  private customerSubscription: Subscription;
  customerCalendarEvent = false;
  calendarEventsInput: any[] = [];
  IsBookingTab = true
  constructor(
    private adminService: AdminService,
    public router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.getCustomersBookings();
  }

  GetAllCustomers() {
    this.customerSubscription = this.adminService
      .GetAllCustomers()
      .pipe(
        switchMap((res) => {
          this.userProfiles = res.body;
          this.userProfiles.forEach((x) => {
            x.avatar = this.combineFirstLettersToUpper(x.firstName, x.lastName);
          });
          return interval(2000);
        })
      )
      .subscribe(() => {
        this.adminService.GetAllCustomers().subscribe((res) => {
          this.userProfiles = res.body;
          this.userProfiles.forEach((x) => {
            x.avatar = this.combineFirstLettersToUpper(x.firstName, x.lastName);
          });
        });
      });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/authentication/signin']);
  }
  combineFirstLettersToUpper(str1, str2) {
    const firstLetter1 = str1.charAt(0).toUpperCase();
    const firstLetter2 = str2.charAt(0).toUpperCase();
    return firstLetter1 + firstLetter2;
  }
  handleAdminChatEvent(event) {
    this.GetAllCustomers();
    this.isAdminChat = event;
  }
  readAllMessages(user) {
    var idx = this.userProfiles.findIndex(x => x.userGUID == user.userGUID);
    if (idx > -1) {
      this.userProfiles[idx].isNotify = false;
    }
    var obj = {
      SenderOne: user.userGUID,
    };
    this.adminService.readAllMessages(obj).subscribe({
      next: (res: any) => {
        if (this.customerSubscription) {
          this.customerSubscription.unsubscribe();
        }
        this.isAdminChat = true;
        this.selectedUserGuid = user.userGUID;
        this.UserNameInChat = user.firstName + ' ' + user.lastName;
      },
      error: (error: any) => {},
    });
  }
  ngOnDestroy() {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
  }
  getCustomersBookings() {
    this.adminService.getCustomersBookings().subscribe({
      next: (res: any) => {
        this.calendarEventsInput = res.body;
        this.GetAllCustomers();
      },
      error: (error: any) => {},
    });
  }
}
