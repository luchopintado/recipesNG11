import {ActionReducerMap} from '@ngrx/store';

import {authReducer} from '../auth/store/auth.reducer';
// import {shoppingListReducer} from '../shopping-list/store/shopping-list.reducer';
import * as fromAuthStore from '../auth/store/auth.reducer';
import * as fromShoppingListStore from '../shopping-list/store/shopping-list.reducer';

export interface AppState {
  shoppingList: fromShoppingListStore.ShoppingListState;
  auth: fromAuthStore.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingListStore.shoppingListReducer,
  auth: authReducer,
};
