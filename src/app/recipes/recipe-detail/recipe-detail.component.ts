import { map, switchMap } from 'rxjs/operators';
import { Ingerdient } from './../../shared/ingredient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddIngredient } from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  inRecipe: Recipe;
  recId: number;
  constructor(private store: Store<fromApp.AppState>,
    // private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router, ) { }

  ngOnInit() {
    this.route.params.pipe(map(params => {
      return +params['id'];
    }), switchMap(id => {
      this.recId = id;
      return this.store.select('recipes');
    }), map(recipesState => {
      return recipesState.recipes.find((recipe, index) => {
        return index === this.recId;
      });
    })).subscribe(recipe => {
      this.inRecipe = recipe;
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
    // this.recipeService.deleteRecipe(this.recId);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recId));
    this.router.navigate(['/recipes']);
  }

}
