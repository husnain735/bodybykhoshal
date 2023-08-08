import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isFormOpen = false;
  userProfiles: any[] = [];
  isAdminChat = false;
  selectedUserGuid: string;
  UserNameInChat: string;
  constructor(private adminService: AdminService,
    public router: Router,public authService: AuthService) {
     
  }

  ngOnInit() {
    this.GetAllCustomers()
  }

  GetAllCustomers() {
    this.adminService.GetAllCustomers().subscribe({
      next: (res: any) => {
        this.userProfiles = res.body;
        this.userProfiles.forEach(x => {
          x.avatar = this.combineFirstLettersToUpper(x.firstName, x.lastName);
        })
      }, error: (error: any) => {

      }
    })
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
    this.isAdminChat = event;
  }
}
