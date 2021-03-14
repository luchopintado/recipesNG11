import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import {AuthService} from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective | undefined;
  private closeSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnDestroy(): void {
    this.closeSubscription?.unsubscribe();
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
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
      }
    );

    authForm.reset();
  }

  /*onDismissError(): void {
    this.error = null;
  }*/

  showErrorAlert(message: string): void {
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost?.viewContainerRef;

    hostViewContainerRef?.clear();
    const componentRef = hostViewContainerRef?.createComponent(alertCompFactory);
    const componentInstance = componentRef?.instance;
    if (componentInstance) {
      componentInstance.message = message;
      this.closeSubscription = componentInstance.close.subscribe(() => {
        this.closeSubscription?.unsubscribe();
        hostViewContainerRef?.clear();
      });
    }
  }
}
