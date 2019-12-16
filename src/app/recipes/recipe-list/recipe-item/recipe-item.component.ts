import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeId: number;
  recipe: Recipe;

  constructor(private resService: RecipeService) { }

  ngOnInit() {
    this.recipe = this.resService.getRecipeById(+this.recipeId);
  }

}
