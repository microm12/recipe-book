import { ActivatedRoute, Params, Router } from '@angular/router';
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
  constructor(private shoppingService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recId = +params.id;
      this.inRecipe = this.recipeService.getRecipeById(this.recId);
    });
  }

  onAddIngr() {
    // create a deep copy of the ingredient array so the value amount
    // does't change in the recipe service
    const ingredients = JSON.parse(JSON.stringify(this.inRecipe.ingredients));
    for (let ingredient of ingredients) {
      this.shoppingService.addIngredient(ingredient);
    }
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recId);
    this.router.navigate(['/recipes']);
  }

}
