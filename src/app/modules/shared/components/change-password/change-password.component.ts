import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  erorr;
  mismatch: any = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.passwordForm = this.formBuilder.group({
      new_password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }
  changePassword() {
    const body = {
      user_id: this.data.id,
      new_password: this.passwordForm.value.new_password,
    };
    this.auth.updateUser(body).subscribe((res) => {});
  }
  passwordMatchValidator() {
    const password = this.passwordForm.get('new_password').value;
    const confirmPassword = this.passwordForm.get('confirmPassword').value;

    if (password !== confirmPassword) {
      this.mismatch = true;
    } else {
      this.mismatch = false;
    }
  }
}
