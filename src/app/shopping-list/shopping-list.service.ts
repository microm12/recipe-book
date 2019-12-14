import { Ingerdient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  onChange = new EventEmitter<Ingerdient[]>();
  private ingredients: Ingerdient[] = [
    new Ingerdient('Tomatoes', 2),
    new Ingerdient('Meat', 1)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingr: Ingerdient) {
    let found = false;
    for (let ingredient of this.ingredients) {
      if (ingredient.name === ingr.name) {
        // tslint:disable-next-line: radix
        ingredient.amount = ingredient.amount + parseInt(ingr.amount.toString());
        found = true;
        this.onChange.emit(this.ingredients.slice());
      }
    }
    if (!found) {
      this.ingredients.push(ingr);
      this.onChange.emit(this.ingredients.slice());
    }

  }

}
