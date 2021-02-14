import { Component, Input } from '@angular/core';
import { Recipe } from '../../../shared/recipe.model';
import { RecipesService } from '../../../shared/recipes.service';
import {EmptyRecipe} from '../../../shared/empty-recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input() recipe: Recipe;

  constructor(private recipeSrv: RecipesService) {
    this.recipe = EmptyRecipe;
  }

  onSelected(): void {
    this.recipeSrv.recipeSelected.emit(this.recipe);
  }
}
