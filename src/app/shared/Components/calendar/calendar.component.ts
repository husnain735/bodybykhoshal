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
  calCheck: any;

  constructor(
    private fb: UntypedFormBuilder,
    public calendarService: CalendarService,
    private modalService: NgbModal,
    private homeService: HomeService // private toastr: ToastrService
  ) {
    this.dialogTitle = 'Add New Event';
    const blankObject = {} as Calendar;
    this.calendar = new Calendar(blankObject);
    this.calendarForm = this.createCalendarForm(this.calendar);
  }

  ngOnInit() {
    //this.calendarEvents = INITIAL_EVENTS;
    //this.tempEvents = this.calendarEvents;
    // this.calendarOptions.initialEvents = this.calendarEvents;
    // this.tempEvents = this.calendarEvents;
    // this.calendarOptions.initialEvents = this.calendarEvents;
  }

  calendarOptions: CalendarOptions = {
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
    firstDay: new Date().getDay(), // Start week from the current day
    dateIncrement: { days: 1 }, // Increment by 1 day
    validRange: {
      start: new Date(), // Start from the current date
      end: new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000) // End after 6 days
    }
  };

  handleDateSelect(selectInfo: DateSelectArg) {
    this.eventWindowCall(selectInfo, 'addEvent');
  }
  eventWindowCall(row: any, type: string) {

    if (type === 'editEvent') {
      this.dialogTitle = row.event.title;
      this.isEditClick = true;
      this.calendarForm.setValue({
        id: row.event.id,
        title: row.event.title,
        startDate: row.event.start,
        endDate: row.event.end,
        details: row.event.extendedProps.details,
      });
    } else {
      this.calendarForm.reset();
      this.isEditClick = false;
    }

    this.modalService.open(this.eventWindow, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  saveEvent(form: UntypedFormGroup) {
    this.calendarData = form.value;

    var obj = {
      Title: this.calendarData.title,
      Start: this.calendarData.startDate,
      End: this.calendarData.endDate,
      Details: this.calendarData.details
    }
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
          });
          this.calendarOptions.events = this.calendarEvents;
          this.calendarForm.reset();
          this.modalService.dismissAll();

          this.showNotification(
            'success',
            'Save Event Successfully...!!!',
            'top',
            'right'
          );
        }
      }, error: (error: any) => {

      }
    })
  }

  eventClick(form: UntypedFormGroup) {

    this.calendarData = form.value;

    this.calendarEvents.forEach((element, index) => {
      if (+this.calendarData.id === +element.id) {
        this.saveEditEvent(index, this.calendarData);
      }
    }, this);
  }

  saveEditEvent(eventIndex: number, calendarData: any) {

    var obj = {
      Id: calendarData.id,
      Title: calendarData.title,
      Start: calendarData.startDate,
      End: calendarData.endDate,
      Details: calendarData.details
    }
    this.homeService.saveCustomerBooking(obj).subscribe({
      next: (res: any) => {
        const calendarEvents = this.calendarEvents.slice();
        const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
        singleEvent.id = res.body.id;
        singleEvent.title = res.body.title;
        singleEvent.start = calendarData.startDate;
        singleEvent.end = calendarData.endDate;
        singleEvent.className = 'fc-event-info';
        singleEvent['details'] = calendarData.details;
        calendarEvents[eventIndex] = singleEvent;
        this.calendarEvents = calendarEvents;
        this.calendarOptions.events = calendarEvents;
        this.calendarForm.reset();
        this.modalService.dismissAll();
        this.showNotification(
          'success',
          'Edit Event Successfully...!!!',
          'top',
          'right'
        );
      }, error: (error: any) => {

      }
    })

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
    // this.currentEvents = events;
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

  public randomIDGenerate(length: number, chars: string) {
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
      // this.toastr.success(message, '', {
      //   positionClass: 'toast-' + ypos + '-' + xpos,
      // });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.calendarEvents != undefined && this.calendarEvents.length > 0) {
      this.calendarEvents.forEach((x) => {
        x.className =
          x.statusId == 1
            ? 'fc-event-info'
            : x.statusId == 2
              ? 'fc-event-success'
              : x.statusId == 3
                ? 'fc-event-danger'
                : '';
        x.groupId = 'travel';
        x.allDay = false;
      });
      this.tempEvents = this.calendarEvents;
      this.calendarOptions.initialEvents = this.calendarEvents;
      const calendarEvents = this.calendarEvents.slice();
      this.calendarOptions.events = calendarEvents;
      this.calendarForm.reset();
    }
  }

}
