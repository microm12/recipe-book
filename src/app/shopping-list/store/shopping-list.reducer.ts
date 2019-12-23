import * as ShoppingListActions from './shopping-list.actions';
import { Ingerdient } from '../../shared/ingredient.model';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingerdient[];
  editedIngredient: Ingerdient;
  editedIngredientId: number;
}

const initState: State = {
  ingredients: [
    new Ingerdient('Tomatoes', 2),
    new Ingerdient('Meat', 1)
  ],
  editedIngredient: null,
  editedIngredientId: -1
};

export function shoppingListReducer(state: State = initState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGR:
      return {
        ...state, // copy old state
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.UPDATE_INGR:
      const ingredient = state.ingredients[state.editedIngredientId];
      const updatedIngr = {
        ...ingredient, ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientId] = updatedIngr;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientId: -1
      };
    case ShoppingListActions.DEL_INGR:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientId;
        }),
        editedIngredient: null,
        editedIngredientId: -1
      };
    case ShoppingListActions.EDIT_START:
      return {
        ...state,
        editedIngredientId: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };
    case ShoppingListActions.EDIT_END:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientId: -1
      };
    default:
      return state;
  }
}
