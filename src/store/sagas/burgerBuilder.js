import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
  const res = yield axios.get('https://react-my-burger-93215.firebaseio.com/ingredients.json');
  try {
    yield put(actions.setIngredients(res.data));
  } catch (err) {
    yield put(actions.fetchIngredientsFailed());
  }
}
