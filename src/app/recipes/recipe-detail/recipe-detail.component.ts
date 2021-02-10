import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipesService } from '../../shared/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = new Recipe('', '', '');

  constructor(private recipeSrv: RecipesService) {}

  ngOnInit() {
    this.recipe = this.recipeSrv.selectedRecipe;
    this.recipeSrv.recipeEvent.subscribe((recipe: Recipe) => this.recipe = recipe);
  }

}
