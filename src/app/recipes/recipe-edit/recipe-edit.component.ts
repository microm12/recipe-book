import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDesc = '';
    let recipeIngrs = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImg = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe.ingredients) {
        for (let ingr of recipe.ingredients) {
          recipeIngrs.push(new FormGroup({
            name: new FormControl(ingr.name, Validators.required),
            amount: new FormControl(ingr.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
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
      this.recipeService.updateRecipe(this.id, newRec);
    } else {
      this.recipeService.addRecipe(newRec);
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
