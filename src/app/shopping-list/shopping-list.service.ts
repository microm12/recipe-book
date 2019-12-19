import { Params } from '@angular/router';
import { Ingerdient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
  onChange = new Subject<Ingerdient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingerdient[] = [
    new Ingerdient('Tomatoes', 2),
    new Ingerdient('Meat', 1)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngrById(id: number) {
    return this.ingredients[id];
  }

  addIngredient(ingr: Ingerdient) {
    let found = false;
    for (const ingredient of this.ingredients) {
      if (ingredient.name === ingr.name) {
        ingredient.amount = ingredient.amount + +ingr.amount;
        found = true;
        this.onChange.next(this.ingredients);
      }
    }
    if (!found) {
      this.ingredients.push(ingr);
      this.onChange.next(this.ingredients);
    }

  }

  updateIngedient(index: number, newIngr: Ingerdient) {
    let found = false;
    for (const ingredient of this.ingredients) {
      if (ingredient.name === newIngr.name) {
        ingredient.amount = ingredient.amount + newIngr.amount;
        this.ingredients.splice(index, 1);
        found = true;
      }
    }
    if (!found) {
      this.ingredients[index] = newIngr;
    }
    this.onChange.next(this.ingredients);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.onChange.next(this.ingredients);
  }

}
