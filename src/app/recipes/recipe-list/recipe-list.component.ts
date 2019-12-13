import { Recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeClicked = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Spaghetti', 'Delicious pasta', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/homemade-spaghetti-sauce-horizontal-1530890913.jpg?crop=1xw:0.7498500299940012xh;center,top&resize=1200:*'),
    new Recipe('Meatballs', 'Balls of meat', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/italian-meatballs-329-horizontal-2-1545406095.jpg?resize=480:*')
  ];

  constructor() { }

  ngOnInit() {
  }

  recipeEvent(recipe: Recipe) {
    this.recipeClicked.emit(recipe);
  }

}
