import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingListStore from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  // @ts-ignore
  ingredientsObs: Observable<{ ingredients: Ingredient[]}>;

  constructor(
    private store: Store<fromShoppingListStore.AppState>,
  ) { }

  ngOnInit(): void {
    this.ingredientsObs = this.store.select('shoppingList');
  }

  onEditItem(index: number): void {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
