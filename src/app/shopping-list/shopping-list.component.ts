import { ShoppingListService } from './shopping-list.service';
import { Ingerdient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingerdient[];
  private subscr: Subscription;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscr = this.shoppingService.onChange.subscribe((ingredients: Ingerdient[]) => this.ingredients = ingredients);
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  editItem(id: number) {
    this.shoppingService.startedEditing.next(id);
  }

}
