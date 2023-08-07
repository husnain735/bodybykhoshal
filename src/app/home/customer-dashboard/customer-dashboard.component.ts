import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  
  constructor(private homeService: HomeService, private ngZone: NgZone) {}

  ngOnInit() {
    this.GetPackage();
  }

  GetPackage() {
    this.package = new Object();
    this.homeService.GetPackage(this.PackageId).subscribe({
      next: (res: any) => {
        this.package = res.body;
        var sessionEndingDate = this.addDaysToDate(
          this.package.createdDate,
          this.package.totalNumberOfSessions
        );
        this.startCounter(sessionEndingDate);
      },
      error: (error) => {},
    });
  }
  addDaysToDate(dateString, daysToAdd) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + daysToAdd);
    return date;
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
      this.counterValue = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      this.animationFrameId = requestAnimationFrame(() =>
        this.updateCounter(resultDate)
      );
    } else {
      this.counterValue = 'Reached the target date!';
    }
  }
  startCounter(resultDate) {
    this.ngZone.runOutsideAngular(() => this.updateCounter(resultDate));
  }
}
