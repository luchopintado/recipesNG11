import { Store } from '@ngrx/store';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { exhaustMap, take, map } from 'rxjs/operators';

import * as fromAppStore from '../store/app.reducer';
import * as fromAuthStore from './store/auth.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private store: Store<fromAppStore.AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuthStore.AuthState) => authState.user),
      exhaustMap(user => {
        console.log(user?.token);
        if (user) {
          const modifiedRequest = req.clone({
            params: new HttpParams().set('auth', user.token || '')
          });
          return next.handle(modifiedRequest);
        }

        return next.handle(req);
      })
    );
  }
}
