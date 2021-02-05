import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Arroz con pollo',
      'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus.',
      'assets/img/arroz_con_pollo.jpg'
    ),
    new Recipe(
      'Anticuchos',
      'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus.',
      'assets/img/anticucho.jpg'
    ),
    new Recipe(
      'Ceviche',
      'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus.',
      'assets/img/ceviche.jpg'
    )
  ];
  constructor() { }

  ngOnInit() {
  }

}
