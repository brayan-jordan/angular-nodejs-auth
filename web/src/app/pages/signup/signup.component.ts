import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private router: Router) {}

  submit(f: NgForm) {
    if (f.valid) {
      this.signUp(f);
    } else {
      this.checkError(f);
    }
  }

  signUp(f: NgForm) {
    this.router.navigate(['/']);
  }

  checkError(f: NgForm): void {
    if (f.form.controls['email'].errors) {
      if (f.form.controls['email'].errors['required']) {
        return console.log('Email é obrigatório');
      }

      if (f.form.controls['email'].errors['email']) {
        return console.log('Email inválido');
      }
    }

    if (f.form.controls['password'].errors) {
      if (f.form.controls['password'].errors['required']) {
        return console.log('O campo senha deve ser preenchido');
      }

      if (f.form.controls['password'].errors['minlength']) {
        return console.log('Senha deve conter 8 caracteres');
      }
    }

    if (f.form.controls['confirmPassword'].errors) {
      if (f.form.controls['confirmPassword'].errors['required']) {
        return console.log('O Campo confirmar senha deve ser preenchido');
      }

      if (f.form.controls['confirmPassword'].errors['minlength']) {
        return console.log('O campo confirmar senha deve conter 8 caracteres');
      }
    }
  }
}
