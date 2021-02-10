import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../shared/recipe.model';
import { RecipesService } from '../../../shared/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeSrv: RecipesService) {
    this.recipe = new Recipe('', '', '');
  }

  ngOnInit() {
  }

  onSelected() {
    this.recipeSrv.recipeSelected.emit(this.recipe);
  }
}
