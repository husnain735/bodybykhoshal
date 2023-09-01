import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.scss']
})
export class AdminBookingComponent implements OnInit {

  customerCalendarEvent = false;
  calendarEventsInput: any[] = [];

  constructor(private adminService: AdminService) {
    
  }


  ngOnInit() {
    this.getCustomersBookings();
  }

  getCustomersBookings() {
    this.adminService.getCustomersBookings().subscribe({
      next: (res: any) => {
        this.calendarEventsInput = res.body;
      },
      error: (error: any) => {},
    });
  }
  syncwithGoogle() {
    this.adminService.syncwithGoogle().subscribe({
      next:(res: any) => {
        if (res.body.success == true && res.body.redirectUrl != undefined) {
          window.open(res.body.redirectUrl, "_blank");
        }
        
      }, error:(error: any) => {

      }
    });
  }
}
