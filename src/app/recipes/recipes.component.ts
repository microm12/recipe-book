import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipe: Recipe;

  constructor(private resService: RecipeService) { }

  ngOnInit() {
    this.resService.selectedRecipe.subscribe((recipe: Recipe) => this.recipe = recipe);
  }

}
