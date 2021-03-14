import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {RecipesComponent} from './recipes.component';
import {RecipesListComponent} from './recipes-list/recipes-list.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipes-list/recipe-item/recipe-item.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {SharedModule} from '../shared/shared.module';
import {RecipesRoutingModule} from './recipes.routing.module';

@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
})
export class RecipesModule {}
