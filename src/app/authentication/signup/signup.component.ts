import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, 
    private AuthService: AuthService,
    public router: Router) {
     
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: [
        '',
        [Validators.required, Validators.email],
      ],
      Password: ['', Validators.required],
      PhoneNumber: ['', [Validators.required]],
      RoleId: [2]
    });
  }
  onSubmit() {
    this.AuthService.RegisterUser(this.registerForm.value).subscribe({
      next:(res: any) => {
        if (res.body.success == 'Email Already Exists') {
          
        }else {
          this.router.navigate(['/authentication/signin']);
        }

        
      }, error:(error: any) => {

      }
    });
  }
}
