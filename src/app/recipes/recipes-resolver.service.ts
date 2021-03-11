import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from '../shared/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from "rxjs";
import { RecipesService } from '../shared/recipes.service';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipesService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();

        if (recipes.length) {
            return recipes;
        }
        return this.dataStorageService.fetchRecipes();
    }
}
