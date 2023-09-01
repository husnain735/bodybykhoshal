import {
  Component,
  ViewChild,
  OnInit,
  TemplateRef,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';

import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Calendar } from './calendar.model';
import { CalendarService } from './calendar.service';
import { INITIAL_EVENTS } from './events-util';
import { formatDate } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from '../../services/home.service';
// import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery'
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  // providers: [ToastrService],
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar', { static: false })
  calendar: Calendar | null;
  calendarForm: UntypedFormGroup;
  dialogTitle: string;
  filterOptions = 'All';
  calendarData: any;
  isEditClick?: boolean;
  filterItems: string[] = [
    'work',
    'personal',
    'important',
    'travel',
    'friends',
  ];

  @Input() calendarEvents!: EventInput[];
  tempEvents?: EventInput[];
  @ViewChild('picker') picker: any;
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public filters = [
    { name: 'work', value: 'Work', checked: true },
    { name: 'personal', value: 'Personal', checked: true },
    { name: 'important', value: 'Important', checked: true },
    { name: 'travel', value: 'Travel', checked: true },
    { name: 'friends', value: 'Friends', checked: true },
  ];

  @ViewChild('callAPIDialog', { static: false })
  callAPIDialog?: TemplateRef<any>;

  @ViewChild('eventWindow')
  eventWindow?: TemplateRef<any>;
  @ViewChild('eventWindow2')
  eventWindow2?: TemplateRef<any>;
  @ViewChild('eventWindow3')
  eventWindow3?: TemplateRef<any>;
  calCheck: any;
  @Input() customerCalendar;
  calendarOptions: CalendarOptions;
  datetimeRangError: boolean;
  bookingTimeError: boolean;
  statusId: number;
  bookingStatus = [
    { id: 2, value: 'Approve' },
    { id: 3, value: 'Reject' },
  ];
  bookinStatusForm: UntypedFormGroup;
  IsCalendarShow: boolean;
  BookingId: number = 0;

  constructor(
    private fb: UntypedFormBuilder,
    public calendarService: CalendarService,
    private modalService: NgbModal,
    private homeService: HomeService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.dialogTitle = 'Add New Event';
    const blankObject = {} as Calendar;
    this.calendar = new Calendar(blankObject);
    this.calendarForm = this.createCalendarForm(this.calendar);
    this.bookinStatusForm = this.fb.group({
      Id: [0],
      Status: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    this.initailizCalendar();
  }
  initailizCalendar() {
    if (this.customerCalendar) {

      // const currentDate = new Date();
      // const startMorning = new Date(currentDate);
      // startMorning.setHours(5, 0, 0); // Set morning start time to 5:00 AM
      // const endMorning = new Date(currentDate);
      // endMorning.setHours(15, 0, 0); // Set morning end time to 8:00 AM
      // const startAfternoon = new Date(currentDate);
      // startAfternoon.setHours(15, 0, 0); // Set afternoon start time to 3:00 PM
      // const endAfternoon = new Date(currentDate);
      // endAfternoon.setHours(19, 0, 0); // Set afternoon end time to 7:00 PM

      // if (currentDate >= startMorning && currentDate <= endMorning) {
      //   this.IsCalendarShow = true;
      // } else if (
      //   currentDate >= startAfternoon &&
      //   currentDate <= endAfternoon
      // ) {
      //   this.IsCalendarShow = true;
      // } else {
      //   this.IsCalendarShow = false;
      // }
      this.calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek',
        },
        initialView: 'timeGridWeek',
        weekends: true,
        editable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this),
        firstDay: new Date().getDay(),
        dateIncrement: { days: 1 },
        validRange: {
          start: new Date(),
          end: new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000),
        },
        slotMinTime: '05:00:00',
        slotMaxTime: '20:00:00',
        // datesSet: (info) => {
        //   const currentDate = new Date();
        //   const startMorning = new Date(currentDate);
        //   startMorning.setHours(5, 0, 0); // Set morning start time to 5:00 AM
        //   const endMorning = new Date(currentDate);
        //   endMorning.setHours(15, 0, 0); // Set morning end time to 8:00 AM
        //   const startAfternoon = new Date(currentDate);
        //   startAfternoon.setHours(15, 0, 0); // Set afternoon start time to 3:00 PM
        //   const endAfternoon = new Date(currentDate);
        //   endAfternoon.setHours(19, 0, 0); // Set afternoon end time to 7:00 PM

        //   if (currentDate >= startMorning && currentDate <= endMorning) {
        //     this.calendarOptions.slotMinTime = '05:00:00';
        //     this.calendarOptions.slotMaxTime = '15:00:00';
        //     this.calendarOptions.slotLabelInterval = { minutes: 60 }; // Show slots every 1 hour
        //   } else if (
        //     currentDate >= startAfternoon &&
        //     currentDate <= endAfternoon
        //   ) {
        //     this.calendarOptions.slotMinTime = '15:00:00';
        //     this.calendarOptions.slotMaxTime = '19:00:00';
        //     this.calendarOptions.slotLabelInterval = { minutes: 60 }; // Show slots every 1 hour
        //   } else {
        //     this.calendarOptions.slotMinTime = '08:00:00';
        //     this.calendarOptions.slotMaxTime = '19:00:00';
        //     this.calendarOptions.slotLabelInterval = '01:00:00'; // Default interval
        //   }
        // },
      };
    } else if (!this.customerCalendar) {
      this.IsCalendarShow = true;
      this.calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        initialView: 'timeGridWeek',
        weekends: true,
        editable: false,
        selectable: false,
        selectMirror: true,
        dayMaxEvents: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this),
        slotMinTime: '05:00:00',
        slotMaxTime: '20:00:00',
        firstDay: new Date().getDay(),
      };
    }

  }
  handleDateSelect(selectInfo: DateSelectArg) {
    this.eventWindowCall(selectInfo, 'addEvent');
  }
  eventWindowCall(row: any, type: string) {

    const startDateObj =  moment(row.start);
    let morningStart = moment(startDateObj);

    if (morningStart.minutes() == 30 && morningStart.hours() == 7) {
      morningStart.set({h: 7, m: 0});
      row.start = moment(morningStart).format("yyyy-MM-DD HH:mm:ss");
    }

    if (morningStart.hours() == 14) {
      morningStart.set({h: 15, m: 0});
      row.start = moment(morningStart).format("yyyy-MM-DD HH:mm:ss");
    }

    morningStart.set({h: morningStart.hours() + 1});
    row.end = moment(morningStart).format("yyyy-MM-DD HH:mm:ss");

    if (this.validateBookingTime(row.start, row.end) || type == 'editEvent') {

      var statusId;
      this.datetimeRangError = false;
      this.bookingTimeError = false;

      if (type === 'editEvent') {
        statusId = +row.event.groupId;
        if (this.customerCalendar) {
          this.dialogTitle = row.event.title;
          this.isEditClick = true;
          this.calendarForm.setValue({
            id: row.event.id,
            title: row.event.title,
            startDate: formatDate(row.event.start, 'yyyy-MM-dd HH:mm:ss', 'en'),
            endDate: formatDate(row.event.end, 'yyyy-MM-dd HH:mm:ss', 'en'),
            details: row.event.extendedProps.details,
          });
        } else if (!this.customerCalendar) {
          this.bookinStatusForm.setValue({
            Id: +row.event.id,
            Status: ['', [Validators.required]],
          });
        }
      } else {
        var endDate = this.addOneHourToDate(row.start);
        statusId = 1;
        this.calendarForm.setValue({
          id: 0,
          title: '',
          startDate: formatDate(row.start, 'yyyy-MM-dd HH:mm:ss', 'en'),
          endDate: formatDate(endDate, 'yyyy-MM-dd HH:mm:ss', 'en'),
          details: '',
        });
        this.isEditClick = false;
      }
      if (this.customerCalendar && statusId == 1) {
        this.modalService.open(this.eventWindow, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'lg',
        });
      }
      if (!this.customerCalendar && statusId == 1) {
        this.modalService.open(this.eventWindow2, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'md',
        });
      }
      if (!this.customerCalendar && statusId == 2) {
        this.BookingId = +row.event.id;
        this.modalService.open(this.eventWindow3, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'md',
        });
      }
    }

  }
  saveEvent(form: UntypedFormGroup) {
    this.calendarData = form.value;
    if (this.validateDateRange(this.calendarData.startDate, this.calendarData.endDate)
        && this.validateBookingTime(this.calendarData.startDate, this.calendarData.endDate)) {
      var obj = {
        Title: this.calendarData.title,
        Start: moment(this.calendarData.startDate).format("yyyy-MM-DD HH:mm:ss") ,
        End: moment(this.calendarData.endDate).format("yyyy-MM-DD HH:mm:ss"),
        Details: this.calendarData.details,
      };
      this.homeService.saveCustomerBooking(obj).subscribe({
        next: (res: any) => {
          if (res.body.id > 0) {
            this.calendarEvents = this.calendarEvents.concat({
              id: res.body.id,
              title: res.body.title,
              start: this.calendarData.startDate,
              end: this.calendarData.endDate,
              className: 'fc-event-info',
              details: this.calendarData.details,
              groupId: '1',
            });
            this.calendarOptions.events = this.calendarEvents;
            this.calendarForm.reset();
            this.modalService.dismissAll();

            this.showNotification(
              'success',
              'Booking save successfully...!!!',
              'top',
              'right'
            );
          } else {
            this.modalService.dismissAll();
            this.showNotification(
              'warning',
              'The booking limit for today has been exceeded.',
              'top',
              'right'
            );
          }
        },
        error: (error: any) => {},
      });
    }
  }
  eventClick(form: UntypedFormGroup) {
    this.calendarData = form.value;
    this.calendarEvents.forEach((element, index) => {
      if (+this.calendarData.id === +element.id) {
        this.Editbooking(index, this.calendarData);
      }
    }, this);
  }
  Editbooking(eventIndex: number, calendarData: any) {
    if (
      this.validateDateRange(this.calendarData.startDate, this.calendarData.endDate)
        && this.validateBookingTime(this.calendarData.startDate, this.calendarData.endDate)
    ) {
      var obj = {
        Id: calendarData.id,
        Title: calendarData.title,
        Start: moment(this.calendarData.startDate).format("yyyy-MM-DD HH:mm:ss") ,
        End: moment(this.calendarData.endDate).format("yyyy-MM-DD HH:mm:ss"),
        Details: calendarData.details,
      };
      this.homeService.saveCustomerBooking(obj).subscribe({
        next: (res: any) => {
          const calendarEvents = this.calendarEvents.slice();
          const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
          singleEvent.id = res.body.id;
          singleEvent.title = res.body.title;
          singleEvent.start = formatDate(
            calendarData.startDate,
            'yyyy-MM-dd HH:mm:ss',
            'en'
          );
          singleEvent.end = formatDate(
            calendarData.endDate,
            'yyyy-MM-dd HH:mm:ss',
            'en'
          );
          singleEvent.className = 'fc-event-info';
          singleEvent['details'] = calendarData.details;
          calendarEvents[eventIndex] = singleEvent;
          this.calendarEvents = calendarEvents;
          this.calendarOptions.events = calendarEvents;
          this.calendarForm.reset();
          this.modalService.dismissAll();
          this.showNotification(
            'success',
            'Booking edit Successfully...!!!',
            'top',
            'right'
          );
        },
        error: (error: any) => {},
      });
    }
  }
  filterEvent(element: any) {
    const list = this.calendarEvents.filter((x) =>
      element.map((y: any) => y).includes(x.groupId)
    );
    this.calendarOptions.events = list;
  }
  handleEventClick(clickInfo: EventClickArg) {
    this.eventWindowCall(clickInfo, 'editEvent');
  }
  handleEvents(events: EventApi[]) {
    $('.fc-timegrid-slots td').each(function() {
      if($(this).data('time').substr(0, 2) >= '08' && $(this).data('time').substr(0, 2) < '15') {

          if ($(this).hasClass('fc-timegrid-slot-lane')) {
            $(this).css('background-color','#c4c4c4').addClass('rest-in-peace');
          }

      }
    });
    $(window).resize();

  }
  createCalendarForm(calendar: Calendar): UntypedFormGroup {
    return this.fb.group({
      id: [calendar.id],
      title: [calendar.title],
      startDate: [calendar.startDate, [Validators.required]],
      endDate: [calendar.endDate, [Validators.required]],
      details: [calendar.details],
    });
  }
  randomIDGenerate(length: number, chars: string) {
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  }
  showNotification(
    eventType: string,
    message: string,
    ypos: string,
    xpos: string
  ) {
    if (eventType === 'success') {
      this.toastr.success(message, '', {
        positionClass: 'toast-' + ypos + '-' + xpos,
      });
    } else if (eventType === 'warning') {
      this.toastr.warning(message, '', {
        positionClass: 'toast-' + ypos + '-' + xpos,
      });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.customerCalendar) {
      this.getCustomerBookings();
    } else {
      if (this.calendarEvents != undefined && this.calendarEvents.length > 0) {
        this.calendarEvents.forEach((x) => {
          x.className =
            x.statusId == 1
              ? 'fc-event-info'
              : x.statusId == 2
              ? 'fc-event-success'
              : x.statusId == 3
              ? 'fc-event-danger'
              : x.statusId == 4
              ? 'fc-event-primary'
              : '';
          x.groupId = x.statusId.toString();
          x.allDay = false;
        });
        this.tempEvents = this.calendarEvents;
        this.calendarOptions.initialEvents = this.calendarEvents;
        const calendarEvents = this.calendarEvents.slice();
        this.calendarOptions.events = calendarEvents;
      }


    }
  }
  validateDateRange(startDate, endDate) {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      const timeDifference = Math.abs(
        startDateObj.getTime() - endDateObj.getTime()
      );
      const maxTimeDifference = 1 * 60 * 60 * 1000;

      if (startDateObj < endDateObj && timeDifference == maxTimeDifference) {
        this.datetimeRangError = false;
        return true;
      } else {
        this.datetimeRangError = true;
        return false;
      }
    }
  }
  validateBookingTime(startDate, endDate) {
    if (startDate && endDate) {
      const startDateObj =  moment(startDate);

      let morningStart = moment(startDateObj);
      morningStart.set({h: 5, m: 0});
      let morningEnd = moment(startDateObj);
      morningEnd.set({h: 7, m: 0});

      let noonStart = moment(startDateObj);
      noonStart.set({h: 15, m: 0});
      let noonEnd = moment(startDateObj);
      noonEnd.set({h: 18, m: 0});

      let startLimit3 = moment(startDateObj);
      startLimit3.set({h: 18, m: 0});

      let bookingTime = startDateObj.format('hh:mm');
      let morningStartTime = morningStart.format('hh:mm');
      let morningEndTime = morningEnd.format('hh:mm');

      let noonStartTime = noonStart.format('hh:mm');
      let noonEndTime = noonEnd.format('hh:mm');

      let inMorning = bookingTime >= morningStartTime && bookingTime <= morningEndTime;
      let inEvening = bookingTime >= noonStartTime && bookingTime <= noonEndTime;

      if (inMorning || inEvening) {
        this.bookingTimeError = false;
        return true;
      } else {
        this.bookingTimeError = true;
        return false;
      }


    }
  }
  approveAndRejectBooking(Status) {
    var obj = {
      BookinId: this.bookinStatusForm.value.Id,
      StatusId: Status,
    };
    this.adminService.approveAndRejectBooking(obj).subscribe({
      next: (res: any) => {
        if (res.body.success) {
          var idx = this.calendarEvents.findIndex(
            (x) => +x.id == this.bookinStatusForm.value.Id
          );
          if (idx > -1) {
            this.calendarEvents[idx].groupId = Status.toString();
            this.calendarEvents[idx].className =
              this.calendarEvents[idx].groupId == '1'
                ? 'fc-event-info'
                : this.calendarEvents[idx].groupId == '2'
                ? 'fc-event-success'
                : this.calendarEvents[idx].groupId == '3'
                ? 'fc-event-danger'
                : this.calendarEvents[idx].groupId == '4'
                ? 'fc-event-primary'
                : '';
          }
          this.tempEvents = this.calendarEvents;
          this.calendarOptions.initialEvents = this.calendarEvents;
          const calendarEvents = this.calendarEvents.slice();
          this.calendarOptions.events = calendarEvents;
        } else {
          this.showNotification(
            'warning',
            'The Session limit complete for this user.',
            'top',
            'right'
          );
        }
        this.bookinStatusForm.reset();
        this.modalService.dismissAll();
      },
      error: (error: any) => {},
    });
  }
  getCustomerBookings() {
    this.homeService.getCustomerBookings().subscribe({
      next: (res: any) => {
        this.calendarEvents = res.body;
        this.calendarEvents.forEach((x) => {
          x.className =
            x.statusId == 1
              ? 'fc-event-info'
              : x.statusId == 2
              ? 'fc-event-success'
              : x.statusId == 3
              ? 'fc-event-danger'
              : x.statusId == 4
              ? 'fc-event-primary'
              : '';
          x.groupId = x.statusId.toString();
          x.allDay = false;
        });
        this.tempEvents = this.calendarEvents;
        this.calendarOptions.initialEvents = this.calendarEvents;
        const calendarEvents = this.calendarEvents.slice();
        this.calendarOptions.events = calendarEvents;


      },
      error: (error: any) => {},
    });
  }
  addOneHourToDate(inputDateStr) {
    const inputDate = new Date(inputDateStr);
    const updatedDate = new Date(inputDate.getTime() + 60 * 60 * 1000); // Adding one hour in milliseconds
    return updatedDate;
  }
  completeSession() {
    this.adminService.completeSession(this.BookingId).subscribe({
      next:(res: any) => {
        var idx = this.calendarEvents.findIndex(x => +x.id == this.BookingId);
        if (idx > -1) {
          this.calendarEvents[idx].className = 'fc-event-primary';
          this.calendarEvents[idx].groupId = '4';
        }
        this.tempEvents = this.calendarEvents;
        this.calendarOptions.initialEvents = this.calendarEvents;
        const calendarEvents = this.calendarEvents.slice();
        this.calendarOptions.events = calendarEvents;
        this.modalService.dismissAll();
        this.BookingId = 0;
      }, error:(error: any) => {

      }
    });
  }
}
