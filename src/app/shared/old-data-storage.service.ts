import { Store } from '@ngrx/store';
// import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    // private resService: RecipeService,
    //private authService: AuthService
    private store: Store<fromApp.AppState>) { }

  // saveData() {
  //   // const recipes = this.resService.getRecipes();
  //   return this.http.put('https://recipe-book-b7d5e.firebaseio.com/recipes.json', recipes).subscribe((response) => {
  //     console.log(response);
  //   });
  // }

  fetchData() {
    return this.http.get<Recipe[]>('https://recipe-book-b7d5e.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }), tap(recipes => {
        // this.resService.setRecipes(recipes);
        this.store.dispatch(new RecipesActions.SetRecipes(recipes));
      })
      );

  }

}
