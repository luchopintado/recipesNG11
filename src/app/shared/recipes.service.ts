import { Injectable, Output, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  @Output() recipeEvent = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Arroz con pollo',
      'El arroz con pollo es un plato típico de España y América Latina​ con variaciones regionales según el país. Consiste en arroz cocinado con pollo, en presas o desmechado, verduras, y sazonado con especias.',
      'assets/img/arroz_con_pollo.jpg'
    ),
    new Recipe(
      'Anticuchos',
      'El anticucho es un tipo de brocheta originaria de la época del Virreinato del Perú, ​ que, posterior a la independencia hispanoamericana, se hizo popular en varios países sudamericanos con diferentes variaciones. Consiste en carne y otros alimentos que se asan ensartados en un pincho.',
      'assets/img/anticucho.jpg'
    ),
    new Recipe(
      'Ceviche',
      'El ceviche peruano es un plato tradicional ampliamente consumido en el Perú. El método de preparación es diferente al del ceviche en otros lugares, usando limón, pescado, papas y otros alimentos. En Perú, se ha declarado que el ceviche es parte del "patrimonio nacional" de Perú y se ha declarado feriado en su honor.',
      'assets/img/ceviche.jpg'
    )
  ];

  selectedRecipe: Recipe;;

  constructor() {
    this.selectedRecipe = this.recipes[0];
  }

  onSelectedRecipe(recipe: Recipe) {
    this.recipeEvent.emit(recipe);
  }
}
