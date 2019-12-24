import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

// export interface AuthResponseData {
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private tokenExpTimer: any;


  constructor(// private http: HttpClient,
    // private router: Router,
    private store: Store<fromApp.AppState>) { }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
      this.tokenExpTimer = null;
    }
  }

  // signup(email: string, password: string) {
  //   return this.http.post<AuthResponseData>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }).pipe(catchError(this.handleError), tap(resData => {
  //       this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
  //     }));
  // }

  // login(email: string, password: string) {
  //   return this.http.post<AuthResponseData>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }
  //   ).pipe(catchError(this.handleError), tap(resData => {
  //     this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
  //   }));
  // }

  // autoLogin() {
  //   const userData: {
  //     email: string,
  //     id: string,
  //     _token: string,
  //     _tokenExp: Date;
  //   } = JSON.parse(localStorage.getItem('userData'));
  //   if (!userData) {
  //     return;
  //   }
  //   const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExp));

  //   if (loadedUser.token) {
  //     // this.user.next(loadedUser);
  //     this.store.dispatch(new AuthActions.Login({
  //       email: loadedUser.email,
  //       userId: loadedUser.id,
  //       token: loadedUser.token,
  //       expDate: new Date(userData._tokenExp)
  //     }));
  //     const expDuration = new Date(userData._tokenExp).getTime() - new Date().getTime();
  //     this.autoLogout(expDuration);
  //   }
  // }

  // logout() {
  //   // this.user.next(null);
  //   this.store.dispatch(new AuthActions.Logout());
  //   // this.router.navigate(['/auth']);
  //   localStorage.removeItem('userData');
  //   if (this.tokenExpTimer) {
  //     clearTimeout(this.tokenExpTimer);
  //   }
  //   this.tokenExpTimer = null;
  // }

  // private handleAuth(email: string, localId: string, token: string, expiresIn: number) {
  //   const expDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, localId, token, expDate);
  //   // this.user.next(user);
  //   this.store.dispatch(new AuthActions.Login({ email: email, userId: localId, token: token, expDate: expDate }));
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMsg = 'An unknown error has occured.';
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMsg);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMsg = 'This email already exists.';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMsg = 'Incorrect email address.';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMsg = 'The password you entered is incorrect.';
  //       break;
  //   }
  //   return throwError(errorMsg);
  // }

}

