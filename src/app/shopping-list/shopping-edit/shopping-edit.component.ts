import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingListStore from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm | undefined;
  subscription: Subscription | undefined;
  editMode = false;

  constructor(
    private store: Store<fromShoppingListStore.AppState>,
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData: fromShoppingListStore.ShoppingListState) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.slForm?.setValue({
            name: stateData.editedIngredient?.name,
            amount: stateData.editedIngredient?.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmitIngredient(editForm: NgForm): void {
    const { name, amount } = editForm.value;

    if (name && amount) {
      const ingredient = new Ingredient(name, amount);
      if (this.editMode) {
        this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
        this.editMode = false;
      } else {
        this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
      }
      editForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onClear(): void {
    this.slForm?.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}

