import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService, ActiveToast } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {}

  isLoading = false;

  submit(f: NgForm) {
    if (f.valid) {
      this.signUp(f);
    } else {
      this.checkError(f);
    }
  }

  signUp(f: NgForm) {
    this.isLoading = true;
    this.apiService
      .signUp(f.value.email, f.value.password, f.value.confirmPassword)
      .subscribe({
        error: (err) => {
          this.toastr.error(err.error.message);
        },
        next: (res) => {
          this.toastr.success('Successfully registered user');
          this.router.navigate(['/login']);
        },
      })
      .add(() => {
        this.isLoading = false;
      });
  }

  checkError(f: NgForm): void {
    const emailControl = f.form.controls['email'];
    const passwordControl = f.form.controls['password'];
    const confirmPasswordControl = f.form.controls['confirmPassword'];

    if (emailControl.errors) {
      if (emailControl.errors['required']) {
        this.toastr.error('The email field must be filled in obligatorily');
        return;
      }

      if (emailControl.errors['email']) {
        this.toastr.error('The email field must contain a valid email');
        return;
      }
    }

    if (passwordControl.errors) {
      if (passwordControl.errors['required']) {
        this.toastr.error('The password field must be filled in obligatorily');
        return;
      }

      if (passwordControl.errors['minlength']) {
        this.toastr.error(
          'The password field must contain at least 8 characters'
        );
        return;
      }
    }

    if (confirmPasswordControl.errors) {
      if (confirmPasswordControl.errors['required']) {
        this.toastr.error(
          'The field confirm password must be filled in obligatorily'
        );
        return;
      }

      if (confirmPasswordControl.errors['minlength']) {
        this.toastr.error(
          'The confirm password field must contain at least 8 characters'
        );
        return;
      }
    }
  }
}
