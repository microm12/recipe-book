import { Ingerdient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';

export const ADD_INGR = 'ADD_INGR';
export const UPDATE_INGR = 'UPDATE_INGR';
export const DEL_INGR = 'DEL_INGR';
export const EDIT_START = 'EDIT_START';
export const EDIT_END = 'EDIT_END';

export type ShoppingListActions = AddIngredient | UpdateIngredient | DeleteIngredient | EditStart | EditEnd;

export class AddIngredient implements Action {
  readonly type = ADD_INGR;

  constructor(public payload: Ingerdient) { }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGR;

  constructor(public payload: Ingerdient) { }
}

export class DeleteIngredient implements Action {
  readonly type = DEL_INGR;
}

export class EditStart implements Action {
  readonly type = EDIT_START;

  constructor(public payload: number) { }
}

export class EditEnd implements Action {
  readonly type = EDIT_END;
}


