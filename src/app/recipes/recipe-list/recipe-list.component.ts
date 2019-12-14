import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private resService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.resService.getRecipes();
  }

  recipeEvent(recipe: Recipe) {
    this.resService.selectedRecipe.emit(recipe);
  }

}
