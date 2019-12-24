import * as AuthActions from './../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthed = false;
  private userSub: Subscription;

  constructor(
    // private dataService: DataStorageService,
    // private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthed = !!user; // !user ? false : true;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSave() {
    // this.dataService.saveData();
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetch() {
    // this.dataService.fetchData().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
