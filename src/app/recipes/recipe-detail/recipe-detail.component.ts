import { Component, Input } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipesService } from '../../shared/recipes.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private recipesService: RecipesService) {}

  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
