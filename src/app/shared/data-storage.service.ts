import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(
        private httpClient: HttpClient,
        private recipeService: RecipesService) {}

    storeRecipes(): void {
        const recipes = this.recipeService.getRecipes();
        this.httpClient
            .put('https://ng-complete-guide-e8270-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => console.log(response));
    }

    fetchRecipes(): Observable<Recipe[]> {
        return this.httpClient
            .get<Recipe[]>('https://ng-complete-guide-e8270-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => ({
                        ...recipe,
                        ingredients: recipe.ingredients || []
                    }));
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes)
                })
            );
            /*
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes)
            });
            */
    }
}