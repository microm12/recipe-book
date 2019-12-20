import { RecipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private resService: RecipeService, private authService: AuthService) { }

  saveData() {
    const recipes = this.resService.getRecipes();
    return this.http.put('https://recipe-book-b7d5e.firebaseio.com/recipes.json', recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchData() {
    return this.http.get<Recipe[]>('https://recipe-book-b7d5e.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }), tap(recipes => {
        this.resService.setRecipes(recipes);
      })
      );

  }

}
