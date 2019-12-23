// import { ShoppingListService } from './shopping-list.service';
import { Ingerdient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingerdient[]; }>;
  // private subscr: Subscription;

  constructor(//private shoppingService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingService.getIngredients();
    // this.subscr = this.shoppingService.onChange.subscribe((ingredients: Ingerdient[]) => this.ingredients = ingredients);
  }

  ngOnDestroy() {
    // this.subscr.unsubscribe();
  }

  editItem(id: number) {
    this.store.dispatch(new ShoppingListActions.EditStart(id));
  }

}
