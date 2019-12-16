import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  inRecipe: Recipe;
  recId: number;
  constructor(private shoppingService: ShoppingListService, private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recId = +params.id;
      this.inRecipe = this.recipeService.getRecipeById(this.recId);
    });
  }

  onAddIngr() {
    for (const ingredient of this.inRecipe.ingredients) {
      this.shoppingService.addIngredient(ingredient);
    }
  }

}
