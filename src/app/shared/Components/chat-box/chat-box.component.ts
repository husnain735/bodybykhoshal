import {
  ChangeDetectionStrategy,
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
import { Subscription, debounceTime, interval, startWith, switchMap } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  uploadAdminUrl: string;
  uploadCustomerUrl: string;
  ChatType = 1;
  baseUrl = environment.ResourceServer.BaseApiUrl;
  constructor(
    private elementRef: ElementRef,
    private homeService: HomeService,
    private adminService: AdminService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.uploadAdminUrl = environment.ResourceServer.Endpoint + 'Admin/UploadChat';
    this.uploadCustomerUrl = environment.ResourceServer.Endpoint + 'Home/UploadChat';
  }

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
    if (this.chat != undefined && this.chat != '' && this.chat != '\n') {
      var obj = {
        Content: this.chat,
        ChatType: this.ChatType
      };
      this.homeService.saveChat(obj).subscribe({
        next: (res: any) => {
          this.chat = '';
          this.scrollToBottom();
        },
        error: (error: any) => { },
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
    }
    else {
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
    } catch (err) { }
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
            this.chats = response.body;
          }

          return interval(2000);
        })
      )
      .subscribe(() => {
        this.adminService
          .GetAdminChatWithCustomer(obj)
          .subscribe((response) => {

            const newChats = response.body;
            if (this.chats.length != newChats.length) {
              if (this.isAdminChatChild) {
                this.scrollToBottom();
              }
              this.chats = newChats;
            }

          });
      });
  }
  saveChatForAdmin() {
    if (this.chat != undefined && this.chat != '' && this.chat != '\n') {
      var obj = {
        SenderTwo: this.SenderTwo,
        Content: this.chat,
        ChatType: this.ChatType
      };
      this.adminService.saveChatForAdmin(obj).subscribe({
        next: (res: any) => {
          this.chat = '';
          this.ChatType = 1;
          this.scrollToBottom();
        },
        error: (error: any) => { },
      });
    }
  }
  closeChat() {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
    this.isAdminChatEvent.emit(false);
  }
  handleFileChange(event: any) {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      if (fileList.length > 1) {
        console.log('Please select only one image.');
      } else {
        const file: File = fileList[0];
        if (file.type.startsWith('image/')) {
          console.log('Selected image:', file);
          const frmData = new FormData();
          const TOKEN = 'Bearer ' + localStorage.getItem('token');
          const headers = new HttpHeaders({
            Authorization: TOKEN,
          });
          frmData.append("myfile", file);
          this.http.post(this.isAdminChatChild ? this.uploadAdminUrl : this.uploadCustomerUrl,
            frmData,
            { headers: headers, reportProgress: true, responseType: 'text', observe: "events" })
            .subscribe((response: any) => {
              this.chat = response.body;
              this.ChatType = 2;
              if (this.isAdminChatChild) {
                this.saveChatForAdmin();
                this.GetAdminChatWithCustomer();
              } else if(this.isFormOpenChild) {
                this.saveChat();
                this.GetChatWithAdmin();
              }

            });
        } else {
          console.log('Invalid file type. Please select an image.');
        }
      }
    }
  }
}
