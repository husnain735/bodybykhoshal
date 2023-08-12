import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Message } from '../../models/Message';
import { MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HomeService } from '../../services/home.service';
import { Subscription, interval, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  animations: [
    trigger('slideUp', [
      state('open', style({ transform: 'translateY(0)' })),
      state('closed', style({ transform: 'translateY(100%)' })),
      transition('closed => open', animate('0.5s ease-in-out')),
      transition('open => closed', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class ChatBoxComponent implements OnInit {
  message: string = '';
  chats: any[] = [];
  @Input() isFormOpenChild: boolean = false;
  @Input() isAdminChatChild: boolean = false;
  @Input() SenderTwo: string;
  @Input() UserName: string;
  chatBoxHeight: string;
  private chatSubscription: Subscription;
  chat: string;
  @ViewChild('scrollMe', { static: false }) private chatContainer: ElementRef;
  @Output() isAdminChatEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private homeService: HomeService,
    private adminService: AdminService
  ) {}

  ngOnInit() {}

  sendMessage() {
    const newMessage: Message = {
      content: this.message,
      sender: 'You',
      timestamp: new Date(),
    };
    this.message = '';
  }
  openForm() {
    this.isFormOpenChild = true;
  }

  closeForm() {
    this.isFormOpenChild = false;
  }
  onAnimationDone(event: AnimationEvent) {
    if (!this.isFormOpenChild && !this.isAdminChatChild) {
      const element = event.target as HTMLElement;
      element.classList.add('form-popup-closed');
    }
  }

  GetChatWithAdmin() {
    this.chatSubscription = this.homeService
      .GetChatWithAdmin()
      .pipe(
        switchMap((response) => {
          if (this.chats.length != response.body.success.length) {
            if (this.isFormOpenChild) {
              this.scrollToBottom();
            }
          }
          this.chats = response.body.success;
          return interval(2000);
        })
      )
      .subscribe(() => {
        this.homeService.GetChatWithAdmin().subscribe((response) => {
          if (this.chats.length != response.body.success.length) {
            if (this.isFormOpenChild) {
              this.scrollToBottom();
            }
          }
          this.chats = response.body.success;
        });
      });
  }

  ngOnDestroy() {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
  }
  saveChat() {
    if (this.chat != undefined && this.chat != '') {
      var obj = {
        Content: this.chat,
      };
      this.homeService.saveChat(obj).subscribe({
        next: (res: any) => {
          this.chat = '';
          this.scrollToBottom();
        },
        error: (error: any) => {},
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isFormOpenChild) {
      var roleId = +localStorage.getItem('roleId');
      if (roleId == 2) {
        this.GetChatWithAdmin();
      }
      this.scrollToBottom();
    } else {
      if (this.chatSubscription) {
        this.chatSubscription.unsubscribe();
      }
    }
    if (this.isAdminChatChild) {
      if (this.SenderTwo != undefined) {
        this.GetAdminChatWithCustomer();
      }
      this.scrollToBottom();
    }
  }
  private scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      }, 0);
    } catch (err) {}
  }
  GetAdminChatWithCustomer() {
    var obj = {
      SenderTwo: this.SenderTwo,
    };

    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }

    this.chatSubscription = this.adminService
      .GetAdminChatWithCustomer(obj)
      .pipe(
        switchMap((response) => {
          if (this.chats.length != response.body.length) {
            if (this.isAdminChatChild) {
              this.scrollToBottom();
            }
          }
          this.chats = response.body;
          return interval(2000);
        })
      )
      .subscribe(() => {
        this.adminService
          .GetAdminChatWithCustomer(obj)
          .subscribe((response) => {
            if (this.chats.length != response.body.length) {
              if (this.isAdminChatChild) {
                this.scrollToBottom();
              }
            }
            this.chats = response.body;
          });
      });
  }
  saveChatForAdmin() {
    var obj = {
      SenderTwo: this.SenderTwo,
      Content: this.chat,
    };
    this.adminService.saveChatForAdmin(obj).subscribe({
      next: (res: any) => {
        this.chat = '';
        this.scrollToBottom();
      },
      error: (error: any) => {},
    });
  }
  closeChat() {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
    this.isAdminChatEvent.emit(false);
  }
}
