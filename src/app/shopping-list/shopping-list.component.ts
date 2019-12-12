import { Ingerdient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingerdient[] = [
    new Ingerdient('Tomatoes', 2),
    new Ingerdient('Meat', 1)
  ];

  constructor() { }

  ngOnInit() {
  }

}
