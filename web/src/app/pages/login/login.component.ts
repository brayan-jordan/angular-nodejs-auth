import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {}

  isLoading = false;

  submit(f: NgForm) {
    if (f.valid) {
      this.login(f);
    } else {
      this.checkError(f);
    }
  }

  login(f: NgForm) {
    this.isLoading = true;
    this.apiService
      .login(f.value.email, f.value.password)
      .subscribe({
        error: (err) => {
          this.toastr.error(err.error.message);
        },
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
      })
      .add(() => {
        this.isLoading = false;
      });
  }

  checkError(f: NgForm): void {
    const emailControl = f.form.controls['email'];
    const passwordControl = f.form.controls['password'];

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
  }
}
