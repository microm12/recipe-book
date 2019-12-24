import { Recipe } from './../recipe.model';
import { Action } from '@ngrx/store';

export const SET_RECIPES = '[R] SET_RECIPES';
export const FETCH_RECIPES = '[R] FETCH_RECIPES';
export const ADD_RECIPE = '[R] ADD_RECIPE';
export const UPDATE_RECIPE = '[R] UPDATE_RECIPE';
export const DELETE_RECIPE = '[R] DELETE_RECIPE';
export const STORE_RECIPES = '[R] STORE_RECIPES';

export type RecipesActions = SetRecipes |
  FetchRecipes |
  AddRecipe |
  UpdateRecipe |
  DeleteRecipe |
  StoreRecipes;

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) { }
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number; newRecipe: Recipe; }) { }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) { }
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

