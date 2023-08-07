import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
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
  chatBoxHeight: string;
  private chatSubscription: Subscription;
  chat: string;
  @ViewChild('scrollMe', { static: false }) private chatContainer: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.GetChatWithAdmin();
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
    if (!this.isFormOpenChild) {
      const element = event.target as HTMLElement;
      element.classList.add('form-popup-closed');
    }
  }

  GetChatWithAdmin() {
    this.chatSubscription = this.homeService
      .GetChatWithAdmin()
      .pipe(
        switchMap((response) => {
          this.chats = response.body.success;
          this.chats.forEach((x) => {
            x.avatar = this.combineFirstLettersAndUppercase(
              x.firstName,
              x.lastName
            );
          });
          if (this.isFormOpenChild) {
            this.scrollToBottom();
          }
          return interval(5000);
        })
      )
      .subscribe(() => {
        this.homeService.GetChatWithAdmin().subscribe((response) => {
          this.chats = response.body.success;
          this.chats.forEach((x) => {
            x.avatar = this.combineFirstLettersAndUppercase(
              x.firstName,
              x.lastName
            );
          });
          if (this.isFormOpenChild) {
            this.scrollToBottom();
          }
        });
      });
  }

  ngOnDestroy() {
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
  }
  saveChat() {
    var obj = {
      Content: this.chat,
    };
    this.homeService.saveChat(obj).subscribe({
      next: (res: any) => {
        this.chat = '';
      },
      error: (error: any) => {},
    });
  }
  combineFirstLettersAndUppercase(str1, str2) {
    const firstLetter1 = str1.charAt(0).toUpperCase();
    const firstLetter2 = str2.charAt(0).toUpperCase();
    const combined = firstLetter1 + firstLetter2;
    return combined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isFormOpenChild) {
      this.scrollToBottom();
    }
  }
  private scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }, 0);
    } catch (err) {
    }
  }
}
