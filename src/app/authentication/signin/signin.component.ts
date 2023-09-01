import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm!: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  login() {

   if (this.loginForm.value.Email.trim() == '') {
    this.toastr.error('Email address is missing', 'Error');
    return false;
   }
   if (!this.validateEmail(this.loginForm.value.Email))
   {
    this.toastr.error('Please provide valid email address', 'Error');
    return false;
   }
   if (this.loginForm.value.Password.trim() == '') {
    this.toastr.error('Password is missing', 'Error');
    return false;
   }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.success == false) {
          this.toastr.error('Invalid email or password!', 'Error');
          return false;
        } else {
          if (res.roleId == 2) {
            this.authService.setToken(res.token);
            localStorage.setItem('roleId', res.roleId);
            var PackageId = localStorage.getItem('PackageId');
            if (PackageId != undefined) {
              this.router.navigate(['/home/add-to-cart/' + PackageId]);
            } else {
              this.router.navigate(['/']);
            }
          } else if (res.roleId == 1) {
            this.authService.setToken(res.token);
            localStorage.setItem('roleId', res.roleId);
            this.router.navigate(['/admin']);
          }
        }
      },
    });
  }
}
