import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import { Recipe } from '../../shared/recipe.model';
import { RecipesService } from '../../shared/recipes.service';
import {EmptyRecipe} from '../../shared/empty-recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) {
    this.recipe = EmptyRecipe;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipesService.getRecipe(+params.id);
    });
  }

  onAddToShoppingList(): void {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
