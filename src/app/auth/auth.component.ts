import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }
    const {email, password} = authForm.value;
    let authObservable: Observable<any>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe(
      data => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorResponse => {
        this.error = errorResponse;
        this.isLoading = false;
      }
    );

    authForm.reset();
  }

  onDismissError(): void {
    this.error = null;
  }
}
