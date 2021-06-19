import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import * as fromAppStore from '../store/app.reducer';
import * as fromAuthStore from '../auth/store/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSubscription: Subscription | undefined;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromAppStore.AppState>
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('auth')
      .pipe(map((authState: fromAuthStore.AuthState) => authState.user ))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  toggleNavbar(): void {
    this.collapsed = !this.collapsed;
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
