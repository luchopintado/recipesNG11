import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private changeSubscription: Subscription | null = null;

  constructor(private shoppingListSrv: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListSrv.getIngredients();
    this.changeSubscription = this.shoppingListSrv.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy(): void {
    this.changeSubscription?.unsubscribe();
  }

  onEditItem(index: number): void {
    this.shoppingListSrv.startedEditing.next(index);
  }
}
