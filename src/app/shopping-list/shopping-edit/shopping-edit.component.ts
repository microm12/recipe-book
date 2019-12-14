import { Ingerdient } from './../../shared/ingredient.model';
import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingName', { static: false }) name: ElementRef;
  @ViewChild('ingAmount', { static: false }) amount: ElementRef;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
  }

  addIngredient() {
    this.shoppingService.addIngredient(new Ingerdient(this.name.nativeElement.value, this.amount.nativeElement.value));
  }

}
