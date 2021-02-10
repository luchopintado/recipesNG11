import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipesService } from '../../shared/recipes.service';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeSrv: RecipesService) { }

  ngOnInit() {
    this.recipes = this.recipeSrv.recipes;
  }
}
