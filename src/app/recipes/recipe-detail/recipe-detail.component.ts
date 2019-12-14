import { Recipe } from './../recipe.model';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() inRecipe: Recipe;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngr() {
    for (const ingredient of this.inRecipe.ingredients) {
      this.shoppingService.addIngredient(ingredient);
    }
  }

}
