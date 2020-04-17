import { delay } from 'redux-saga/effects'; // help functions
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], ('expirationDate'));
  yield call([localStorage, 'removeItem'], ('userId'));
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ process.env.FIREBASE_ENV }`;
  if (!action.isSignup) url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ process.env.FIREBASE_ENV }`;

  try {
    const res = yield axios.post(url, authData);

    const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);

    yield call([localStorage, 'setItem'], 'token', res.data.idToken);
    yield call([localStorage, 'setItem'], 'expirationDate', expirationDate);
    yield call([localStorage, 'setItem'], 'userId', res.data.localId);

    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));

  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield call([localStorage, 'getItem'], 'token');
  if (!token) yield put(actions.logout());
  else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate')); // convert expirationDate from a String into a new Date Object.
    if (expirationDate < new Date()) yield put(actions.logout());
    else {
      const userId = yield call([localStorage, 'getItem'], 'userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout(
        (expirationDate.getTime() - new Date().getTime()) / 1000) // expiration seconds left.
      );
    }
  }
}
