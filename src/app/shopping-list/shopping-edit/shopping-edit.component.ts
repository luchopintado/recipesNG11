import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shared/shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm | undefined;
  subscription: Subscription | undefined;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient | undefined;

  constructor(private shoppingListService: ShoppingListService) {
    this.editedItemIndex = -1;
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm?.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onSubmitIngredient(editForm: NgForm): void {
    const { name, amount } = editForm.value;

    if (name && amount) {
      const ingredient = new Ingredient(name, amount);
      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
        this.editMode = false;
      } else {
        this.shoppingListService.addIngredient(ingredient);
      }
      editForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onClear(): void {
    this.slForm?.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}

