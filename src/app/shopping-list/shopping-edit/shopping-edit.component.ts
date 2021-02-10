import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', { static: true }) nameInput: ElementRef | undefined;
  @ViewChild('amountInput', { static: true }) amountInput: ElementRef | undefined;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
  }

  clearValues() {
    if (this.nameInput) {
      this.nameInput.nativeElement.value = '';
      this.nameInput.nativeElement.focus();
    }
    if (this.amountInput) {
      this.amountInput.nativeElement.value = '';
    }
  }

  addIngredient() {
    const name = this.nameInput?.nativeElement.value;
    const amount = this.amountInput?.nativeElement.value;

    if (name && amount) {
      const ingredient = new Ingredient(name, amount);
      this.shoppingListService.addIngredient(ingredient);
      this.clearValues();
    }

  }
}
