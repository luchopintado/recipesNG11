import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../shared/recipes.service';
import { Recipe } from '../shared/recipe.model';
import {EmptyRecipe} from '../shared/empty-recipe';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  selectedRecipe: Recipe = EmptyRecipe;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }

}
