import { Component, Input } from '@angular/core';
import { Recipe } from '../../../shared/recipe.model';
import {EmptyRecipe} from '../../../shared/empty-recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

  @Input() recipe: Recipe;
  @Input() index = 0;

  constructor() {
    this.recipe = EmptyRecipe;
  }

}
