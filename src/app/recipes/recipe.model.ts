import { Ingerdient } from './../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingerdient[];

  constructor(name: string, description: string, imagePath: string, ingredients: Ingerdient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
