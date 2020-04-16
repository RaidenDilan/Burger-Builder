import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga); // logoutSaga -> reference to the saga
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga); // logoutSaga -> reference to the saga
}
