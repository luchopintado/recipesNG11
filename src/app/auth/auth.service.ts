import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_KEY = 'AIzaSyD7sNdmQ1Jb0DLG1KTJBsFpoGCj40PRqCU';
const SIGNUP_END_POINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGNIN_END_POINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

interface AuthResponseType {
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

  constructor(
    private http: HttpClient
  ) {
  }

  signup(email: string, password: string): Observable<AuthResponseType> {
    return this.http
      .post<AuthResponseType>(SIGNUP_END_POINT, {
        email,
        password,
        returnSecureToken: true,
      });
  }

  signin(email: string, password: string): Observable<AuthResponseType> {
    return this.http
      .post<AuthResponseType>(SIGNIN_END_POINT, {
        email,
        password,
        returnSecureToken: true,
      });
  }
}
