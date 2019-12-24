import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  form: FormGroup;
  subs: Subscription;

  constructor(
    private route: ActivatedRoute,
    // private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  private initForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDesc = '';
    let recipeIngrs = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipeById(this.id);
      this.subs = this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      })).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImg = recipe.imagePath;
        recipeDesc = recipe.description;
        if (recipe.ingredients) {
          for (let ingr of recipe.ingredients) {
            recipeIngrs.push(new FormGroup({
              name: new FormControl(ingr.name, Validators.required),
              amount: new FormControl(ingr.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          }
        }
      });

    }

    this.form = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imgUrl: new FormControl(recipeImg, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      ingredients: recipeIngrs
    });
  }

  onSubmit() {
    const newRec = new Recipe(
      this.form.value['name'],
      this.form.value['description'],
      this.form.value['imgUrl'],
      this.form.value['ingredients']);
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, newRec);
      this.store.dispatch(new RecipesActions.UpdateRecipe({ index: this.id, newRecipe: newRec }));
    } else {
      // this.recipeService.addRecipe(newRec);
      this.store.dispatch(new RecipesActions.AddRecipe(newRec));
    }
    this.onCancel();
  }

  onAddIngr() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  get controls() { // a getter!
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  onCancel() {
    this.router.navigate(['../']);
  }

  onDelIngr(i: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(i);
  }

}
