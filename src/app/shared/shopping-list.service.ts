import { Injectable, Output, EventEmitter } from '@angular/core';
import { Ingredient } from './ingredient.model';
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  @Output() ingredientsChanged = new EventEmitter<Ingredient[]>()

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 5),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
