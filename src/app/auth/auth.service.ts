import { Store } from '@ngrx/store';
import { Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from './user.model';
import { environment } from '../../environments/environment';
import * as fromAppStore from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

const LOCAL_STORAGE_USER = 'userData';
const API_KEY = environment.firebaseAPIKey;
const SIGNUP_END_POINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGNIN_END_POINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export interface AuthResponseType {
  displayName?: string;
  email:	string;
  expiresIn:	string;
  idToken: string;
  kind: string;
  localId:	string;
  refreshToken:	string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromAppStore.AppState>,
  ) {}

  private handleAuthError(errorResponse: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An unknown error has occurred';

    if (errorResponse?.error?.error?.message) {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'Too many intents. Try later';
          break;

        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email doesn\'t exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The password is invalid';
          break;
        case 'USER_DISABLED':
          errorMessage = 'The user account has been disabled';
          break;
        default: break;
      }
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: string = "500"): any {
    const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000));
    const user = new User(email, userId, token, expirationDate);
    this.store.dispatch(new AuthActions.Login({ email, userId, token, expirationDate }));
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
  }

  signup(email: string, password: string): Observable<AuthResponseType> {
    return this.http
      .post<AuthResponseType>(SIGNUP_END_POINT, {
        email,
        password,
        returnSecureToken: true,
      }).pipe(
        catchError(this.handleAuthError),
        tap((responseData: any) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponseType> {
    return this.http
    .post<AuthResponseType>(SIGNIN_END_POINT, {
      email,
      password,
      returnSecureToken: true,
    })
    .pipe(
        catchError(this.handleAuthError),
        tap((responseData: any) => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, responseData.expiresIn);
        })
      );
  }

  logout(): void {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem(LOCAL_STORAGE_USER);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin(): void {
    const lsData = localStorage.getItem(LOCAL_STORAGE_USER);
    let userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } | null = null;

    if (lsData) {
       userData = JSON.parse(lsData);
    }

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.store.dispatch(
        new AuthActions.Login({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }));
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number): void {
    // tslint:disable-next-line:no-console
    console.info('autoLogout - expirationDuration:', expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
