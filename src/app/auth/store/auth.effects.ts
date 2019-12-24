import { AuthService } from './../auth.service';
import { User } from './../user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuth = (email: string, userId: string, token: string, expiresIn: number) => {
  const expDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.Login({ email: email, userId: userId, token: token, expDate: expDate, redirect: true });
};

const handleError = (errorRes) => {
  let errorMsg = 'An unknown error has occured.';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.LoginFail(errorMsg));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMsg = 'This email already exists.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMsg = 'Incorrect email address.';
      break;
    case 'INVALID_PASSWORD':
      errorMsg = 'The password you entered is incorrect.';
      break;
  }
  return of(new AuthActions.LoginFail(errorMsg));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        }).pipe(tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }), map(resData => {
          return handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }), catchError(errorRes => {
          return handleError(errorRes);
        }));
    }));

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(tap(resData => {
        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
      }), map(resData => {
        return handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }), catchError(errorRes => {
        return handleError(errorRes);
      }));
    }));

  @Effect()
  authAutoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), map(() => {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExp: Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return { type: 'DUMMY' };
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExp));

    if (loadedUser.token) {
      // this.user.next(loadedUser);
      const expDuration = new Date(userData._tokenExp).getTime() - new Date().getTime();
      this.authService.setLogoutTimer(expDuration);
      return new AuthActions.Login({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expDate: new Date(userData._tokenExp),
        redirect: false
      });
      // const expDuration = new Date(userData._tokenExp).getTime() - new Date().getTime();
      // this.autoLogout(expDuration);
    }
    return { type: 'DUMMY' };
  }));

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
    this.authService.clearLogoutTimer();
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }));

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(ofType(AuthActions.LOGIN), tap((authSuccessAction: AuthActions.Login) => {
    if (authSuccessAction.payload.redirect) {
      this.router.navigate(['/']);
    }
  }));

  constructor(private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }
}
