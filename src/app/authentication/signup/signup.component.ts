import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
     
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
    });
  }
  onSubmit() {

  }
}
