import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscr: Subscription;

  constructor(private resService: RecipeService) { }

  ngOnInit() {
    this.subscr = this.resService.recipesChanged.subscribe((recipes: Recipe[]) => this.recipes = recipes);
    this.recipes = this.resService.getRecipes();
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

}
