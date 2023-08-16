import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription, interval, switchMap } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-packages',
  templateUrl: './admin-packages.component.html',
  styleUrls: ['./admin-packages.component.scss'],
})
export class AdminPackagesComponent implements OnInit {
  private customerSubscription: Subscription;
  isAdminChat = false;
  userProfiles: any[] = [];
  UserNameInChat: string;
  selectedUserGuid: string;
  isFormOpen = false;
  packages: any[] = [];
  @ViewChild('table') table!: DatatableComponent;
  scrollBarHorizontal = window.innerWidth < 1200;
  reorderable = true;
  loadingIndicator = true;
  rows = [{
    "id": 0,
    "img": "assets/images/users/user-2.png",
    "name": "Darlene Riggs",
    "designation": "Manager",
    "gender": "female",
    "phone": "+1 (811) 538-3408",
   "email": "example@test.com",
    "status": "Pending",
    "age": 39,
    "address": "406 Mill Avenue"
  },
  {
    "id": 1,
    "img": "assets/images/users/user-3.png",
    "name": "Head Newton",
    "designation": "Manager",
    "gender": "male",
    "phone": "+1 (847) 585-2042",
   "email": "example@test.com",
    "status": "Completed",
    "age": 34,
    "address": "316 Monitor Street"
  },
  {
    "id": 2,
    "img": "assets/images/users/user-8.png",
    "name": "Desiree Schneider",
    "designation": "Manager",
    "gender": "female",
    "phone": "+1 (995) 549-2754",
   "email": "example@test.com",
    "status": "Active",
    "age": 32,
    "address": "267 Pacific Street"
  },
  {
    "id": 3,
    "img": "assets/images/users/user-5.png",
    "name": "Holman Mann",
    "designation": "Manager",
    "gender": "male",
    "phone": "+1 (975) 430-3063",
   "email": "example@test.com",
    "status": "Active",
    "age": 20,
    "address": "268 Taaffe Place"
  },
  {
    "id": 4,
    "img": "assets/images/users/user-3.png",
    "name": "Stephens Vega",
    "designation": "Manager",
    "gender": "male",
    "phone": "+1 (841) 561-3826",
   "email": "example@test.com",
    "status": "Completed",
    "age": 37,
    "address": "315 Dahl Court"
  },
  {
    "id": 5,
    "img": "assets/images/users/user-10.png",
    "name": "Cassie Abbott",
    "designation": "Manager",
    "gender": "female",
    "phone": "+1 (874) 592-2349",
   "email": "example@test.com",
    "status": "Pending",
    "age": 27,
    "address": "944 Clark Street"
  },
  {
    "id": 6,
    "img": "assets/images/users/user-9.png",
    "name": "Romero Pierce",
    "designation": "Manager",
    "gender": "male",
    "phone": "+1 (954) 511-2933",
   "email": "example@test.com",
    "status": "Active",
    "age": 28,
    "address": "898 Irving Place"
  },
  {
    "id": 7,
    "img": "assets/images/users/user-3.png",
    "name": "Juanita Norris",
    "designation": "Manager",
    "gender": "female",
    "phone": "+1 (914) 512-2265",
   "email": "example@test.com",
    "status": "Completed",
    "age": 40,
    "address": "474 Wakeman Place"
  },
  {
    "id": 8,
    "img": "assets/images/users/user-6.png",
    "name": "Duke Sargent",
    "designation": "Manager",
    "gender": "male",
    "phone": "+1 (916) 556-3683",
   "email": "example@test.com",
    "status": "Completed",
    "age": 38,
    "address": "818 Bragg Street"
  },
  {
    "id": 9,
    "img": "assets/images/users/user-9.png",
    "name": "Selena West",
    "designation": "Manager",
    "gender": "female",
    "phone": "+1 (878) 551-2618",
   "email": "example@test.com",
    "status": "Pending",
    "age": 25,
    "address": "364 Greenwood"
  },
  {
    "id": 10,
    "img": "assets/images/users/user-3.png",
    "name": "Lane Sims",
    "designation": "Manager",
    "gender": "male",
    "phone": "+1 (868) 545-3934",
   "email": "example@test.com",
    "status": "Active",
    "age": 20,
    "address": "293 Cove Lane"
  },
  {
    "id": 11,
    "img": "assets/images/users/user-5.png",
    "name": "Alexandra Carr",
    "designation": "Manager",
    "gender": "female",
    "phone": "+1 (921) 557-3444",
   "email": "example@test.com",
    "status": "Pending",
    "age": 40,
    "address": "119 Wallabout Street"
  },
  {
    "id": 12,
    "img": "assets/images/users/user-7.png",
    "name": "Tanner Hoover",
    "designation": "Manager",
    "gender": "male",
    "phone": "+1 (825) 406-2792",
   "email": "example@test.com",
    "status": "Completed",
    "age": 30,
    "address": "351 Ashland Place"
  }

  ]
  ;
  constructor(
    public authService: AuthService,
    private adminService: AdminService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.getAllCustomerPackages();
  }

  getAllCustomerPackages() {
    this.adminService.getAllCustomerPackages().subscribe({
      next:(res: any) => {
        this.packages = res.body;
      }, error:(error: any) => {

      }
    })
  }
}
