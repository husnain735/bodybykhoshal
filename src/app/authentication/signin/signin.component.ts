import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  
  constructor(private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    public router: Router,) {
    
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  } 

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/']);
      }
    });
  }
}
