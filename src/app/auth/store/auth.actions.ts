import { Action } from '@ngrx/store';

export const LOGIN = '[A] LOGIN';
export const LOGOUT = '[A] LOGOUT';
export const LOGIN_START = '[A] LOGIN_START';
export const LOGIN_FAIL = '[A] LOGIN_FAIL';
export const SIGNUP_START = '[A] SIGNUP_START';
export const CLEAR_ERROR = '[A] CLEAR_ERROR';
export const AUTO_LOGIN = '[A] AUTO_LOGIN';

export type AuthActions = Login | Logout | LoginStart | LoginFail | SignupStart | ClearError | AutoLogin;

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: { email: string; userId: string; token: string; expDate: Date; redirect: boolean; }) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string; }) { }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) { }
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string; }) { }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}


