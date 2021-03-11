import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css']
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string | null = null;

    constructor(private authService: AuthService) {
    }

    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }
    const { email, password } = authForm.value;

    this.isLoginMode = true;
    if (this.isLoginMode) {
      this.authService.signin(email, password).subscribe(
        data => {
          console.log(data);
          this.isLoading = false;
        },
        errorResponse => {
          console.log(errorResponse);
          switch (errorResponse.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              this.error = 'Email not found';
              break;
            case 'INVALID_PASSWORD':
              this.error = 'The password is invalid';
              break;
            case 'USER_DISABLED':
              this.error = 'The user account has been disabled';
              break;
            default: break;
          }
          this.isLoading = false;
        }
      );
    } else {
      this.authService.signup(email, password).subscribe(
        data => {
          console.log(data);
          this.isLoading = false;
        },
        errorResponse => {
          console.log(errorResponse);
          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              this.error = 'This email exists';
              break;
            case 'OPERATION_NOT_ALLOWED':
              this.error = 'Password sign-in is disabled for this project';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              this.error = 'Too many intents. Try later';
              break;
            default: break;
          }
          this.isLoading = false;
        }
      );
    }

    authForm.reset();
  }

  onDismissError(): void {
    this.error = null;
  }
}
