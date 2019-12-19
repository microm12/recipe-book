import { NgForm } from '@angular/forms';
import { Ingerdient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) editForm: NgForm;
  subscr: Subscription;
  editMode = false;
  itemEditedId: number;
  itemEdited: Ingerdient;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.subscr = this.shoppingService.startedEditing.subscribe((id: number) => {
      this.editMode = true;
      this.itemEditedId = id;
      this.itemEdited = this.shoppingService.getIngrById(id);
      this.editForm.setValue({
        name: this.itemEdited.name,
        amount: this.itemEdited.amount
      });
    });
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  addIngredient(form: NgForm) {
    const newIngr = new Ingerdient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngedient(this.itemEditedId, newIngr);
    } else {
      this.shoppingService.addIngredient(newIngr);
    }
    this.editForm.reset();
    this.editMode = false;
  }

  onClear() {
    this.editForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.itemEditedId);
    this.onClear();
  }

}
