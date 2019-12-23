import { Ingerdient } from './../../shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { AddIngredient } from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  inRecipe: Recipe;
  recId: number;
  constructor(private store: Store<fromApp.AppState>,
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
    ingredients.forEach((ingredient: Ingerdient) => {
      this.store.dispatch(new AddIngredient(ingredient));
    });
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recId);
    this.router.navigate(['/recipes']);
  }

}
