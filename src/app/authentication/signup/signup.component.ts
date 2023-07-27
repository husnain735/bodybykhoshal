import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, 
    private AuthService: AuthService) {
     
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
    });
  }
  onSubmit() {
    this.AuthService.RegisterUser(this.registerForm.value).subscribe({
      next:(res: any) => {

      }, error:(error: any) => {

      }
    });
  }
}
