import {Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipesService } from '../../shared/recipes.service';
import {EmptyRecipe} from '../../shared/empty-recipe';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  @Input() recipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) {
    this.recipe = EmptyRecipe;
  }

  ngOnInit(): void {
    const recipeIndex = +this.route.snapshot.params.id;
    this.recipe = this.recipesService.getRecipe(recipeIndex);

    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipesService.getRecipe(+params.id);
    });
  }

  onAddToShoppingList(): void {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
