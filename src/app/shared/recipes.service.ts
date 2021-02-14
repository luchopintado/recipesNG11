import { Injectable, Output, EventEmitter } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  @Output() recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Arroz con pollo',
      'El arroz con pollo es un plato típico de España y América Latina​ con variaciones regionales según el país. Consiste en arroz cocinado con pollo, en presas o desmechado, verduras, y sazonado con especias.',
      'assets/img/arroz_con_pollo.jpg',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Rice', 1),
        new Ingredient('Vegetables', 3)
      ]
    ),
    new Recipe(
      'Anticuchos',
      'El anticucho es un tipo de brocheta originaria de la época del Virreinato del Perú, ​ que, posterior a la independencia hispanoamericana, se hizo popular en varios países sudamericanos con diferentes variaciones. Consiste en carne y otros alimentos que se asan ensartados en un pincho.',
      'assets/img/anticucho.jpg',
      [
        new Ingredient('Corazon de res', 2),
        new Ingredient('Ajos molidos', 2),
        new Ingredient('Sal y pimienta al gusto', 1),
        new Ingredient('½ cdta. de comino (3 gr)', 1),
        new Ingredient('2 cdas. de orégano (30 gr)', 1),
        new Ingredient('½ taza de vinagre (125 ml)', 1),
        new Ingredient('1 taza de cerveza negra (250 ml)', 1),
        new Ingredient('Ají verde al gusto', 1),
        new Ingredient('4 cdas. de ají panca molido (60 gr)', 1),
      ]
    ),
    new Recipe(
      'Ceviche',
      'El ceviche peruano es un plato tradicional ampliamente consumido en el Perú. El método de preparación es diferente al del ceviche en otros lugares, usando limón, pescado, papas y otros alimentos. En Perú, se ha declarado que el ceviche es parte del "patrimonio nacional" de Perú y se ha declarado feriado en su honor.',
      'assets/img/ceviche.jpg',
      [
        new Ingredient('Pescado', 1),
        new Ingredient('Cebolla', 1),
        new Ingredient('Ahi', 1),
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(recipeIndex: number): Recipe {
    return this.recipes[recipeIndex];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.slService.addIngredients(ingredients);
  }
}
