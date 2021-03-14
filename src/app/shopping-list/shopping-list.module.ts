import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'shopping-list', component: ShoppingListComponent},
    ]),
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingListModule {}
