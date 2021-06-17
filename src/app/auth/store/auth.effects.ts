import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

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

const API_KEY = environment.firebaseAPIKey;
const LOGIN_END_POINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export class AuthEffects {

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                .post<AuthResponseType>(LOGIN_END_POINT, {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true,
                })
                .pipe(
                    catchError(error => {
                        of();
                    }),
                    map(responseData => {
                        of();
                    })
                );
        });
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) {}
}