import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListAddComponent } from './shopping-list-add.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [ ShoppingListComponent, ShoppingListAddComponent],
  imports: [CommonModule, FormsModule]
})
export class ShoppingListModule {}