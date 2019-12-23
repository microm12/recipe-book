import * as ShoppingListActions from './../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import { NgForm } from '@angular/forms';
import { Ingerdient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) editForm: NgForm;
  subscr: Subscription;
  editMode = false;
  // itemEditedId: number;
  itemEdited: Ingerdient;

  constructor(// private shoppingService: ShoppingListService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscr = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientId > -1) {
        this.editMode = true;
        this.itemEdited = stateData.editedIngredient;
        this.editForm.setValue({
          name: this.itemEdited.name,
          amount: this.itemEdited.amount
        });
      } else {
        this.editMode = false;
      }
    });
    // this.subscr = this.shoppingService.startedEditing.subscribe((id: number) => {
    //   this.editMode = true;
    //   this.itemEditedId = id;
    //   this.itemEdited = this.shoppingService.getIngrById(id);
    //   this.editForm.setValue({
    //     name: this.itemEdited.name,
    //     amount: this.itemEdited.amount
    //   });
    // });
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
    this.store.dispatch(new ShoppingListActions.EditEnd());
  }

  addIngredient(form: NgForm) {
    const newIngr = new Ingerdient(form.value.name, form.value.amount);
    if (this.editMode) {
      // this.shoppingService.updateIngedient(this.itemEditedId, newIngr);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngr));
    } else {
      // this.shoppingService.addIngredient(newIngr);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngr));
    }
    this.editForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.editForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.EditEnd());
  }

  onDelete() {
    // this.shoppingService.deleteIngredient(this.itemEditedId);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

}
