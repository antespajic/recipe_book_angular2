import { EventEmitter, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';

@Injectable()
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Very tasty', 'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg', [
      new Ingredient("French fries", 2),
      new Ingredient("Pork meat", 1)
    ]),
    new Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])
  ];

  recipesChanged = new EventEmitter<Recipe[]>();

  constructor(private http: Http) { }

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipe-book-87bc5.firebaseio.com/recipes.json', 
          body, 
          {headers: headers});
  }

  fetchData() {
    return this.http.get('https://recipe-book-87bc5.firebaseio.com/recipes.json')
        .map((response: Response) => response.json())
        .subscribe(
          (data: Recipe[]) => {
            this.recipes = data;
            this.recipesChanged.emit(this.recipes);
          }
        );
  }
}
