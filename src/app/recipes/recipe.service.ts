import { Recipe } from './recipe.model';
import { Ingerdient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Spaghetti',
      'Delicious pasta',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/homemade-spaghetti-sauce-horizontal-1530890913.jpg?crop=1xw:0.7498500299940012xh;center,top&resize=1200:*',
      [
        new Ingerdient('Spaghetti Pasta', 1),
        new Ingerdient('Tomato', 2)
      ]),
    new Recipe('Meatballs',
      'Balls of meat',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/italian-meatballs-329-horizontal-2-1545406095.jpg?resize=480:*',
      [
        new Ingerdient('Minced Meat', 4),
        new Ingerdient('Basil', 2)
      ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);

  }

  updateRecipe(index: number, newRec: Recipe) {
    this.recipes[index] = newRec;
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }

}
