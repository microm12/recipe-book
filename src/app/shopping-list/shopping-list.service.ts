import { Ingerdient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
  onChange = new Subject<Ingerdient[]>();
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
    for (const ingredient of this.ingredients) {
      if (ingredient.name === ingr.name) {
        // tslint:disable-next-line: radix
        ingredient.amount = ingredient.amount + parseInt(ingr.amount.toString());
        found = true;
        this.onChange.next(this.ingredients.slice());
      }
    }
    if (!found) {
      this.ingredients.push(ingr);
      this.onChange.next(this.ingredients.slice());
    }

  }

}
