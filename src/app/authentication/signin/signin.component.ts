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
    public router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.success == false) {
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
