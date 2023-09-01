import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Subscription, interval, switchMap } from 'rxjs';
import { HomeService } from 'src/app/shared/services/home.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
})
export class CustomerDashboardComponent implements OnInit {
  PackageId: number = 0;
  package: any;
  counterValue: string;
  animationFrameId: number | undefined;
  isFormOpen: boolean = false;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  private notificationSubscription: Subscription;
  notification: any;
  calendarEventsInput: any[] = [];
  customerCalendarEvent = true;

  constructor(private homeService: HomeService, private ngZone: NgZone) {}

  ngOnInit() {
    // this.calendarEventsInput = new Object();
    this.notification = new Object();
    this.GetCustomerPackage();
    this.getCustomerBookings();
  }

  GetCustomerPackage() {
    this.package = new Object();
    this.homeService.GetCustomerPackage().subscribe({
      next: (res: any) => {
        this.package = res.body;
        // var sessionEndingDate = this.addDaysToDate(
        //   this.package.createdDate,
        //   this.package.totalNumberOfSessions
        // );
        //this.startCounter(sessionEndingDate);
        this.getCustomerNotification();
      },
      error: (error) => {},
    });
  }
  addDaysToDate(dateString, daysToAdd) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + daysToAdd);
    return date;
  }
  startCounter(resultDate) {
    this.ngZone.runOutsideAngular(() => this.updateCounter(resultDate));
  }
  updateCounter(resultDate) {
    const currentDate = new Date();
    const difference = resultDate.getTime() - currentDate.getTime();
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      this.counterValue = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      this.animationFrameId = requestAnimationFrame(() =>
        this.updateCounter(resultDate)
      );
    } else {
      this.counterValue = 'Reached the target date!';
    }
  }
  getCustomerNotification() {
    this.notificationSubscription = this.homeService
      .getCustomerNotification()
      .pipe(
        switchMap((response) => {
          this.notification = response.body.success;
          return interval(2000);
        })
      )
      .subscribe(() => {
        this.homeService.getCustomerNotification().subscribe((response) => {
          this.notification = response.body.success;
        });
      });
  }
  ngOnDestroy() {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
  openClose() {
    this.isFormOpen = !this.isFormOpen;
    if (this.isFormOpen) {
      this.readAllMessages();
      if (this.notificationSubscription) {
        this.notificationSubscription.unsubscribe();
      }
    } else {
      this.getCustomerNotification();
    }
  }
  readAllMessages() {
    this.notification.isNotify = false;
    this.homeService.readAllMessages().subscribe({
      next: (res: any) => {

      }, error: (error: any) => {

      }
    });
  }
  getCustomerBookings() {
    this.homeService.getCustomerBookings().subscribe({
      next: (res: any) => {
        this.calendarEventsInput = res.body;
      },
      error: (error: any) => {},
    });
  }
  syncwithGoogle() {
    this.homeService.syncwithGoogle().subscribe({
      next:(res: any) => {
        if (res.body.success == true && res.body.redirectUrl != undefined) {
          window.open(res.body.redirectUrl, "_blank");
        }
        
      }, error:(error: any) => {

      }
    });
  }
}
