import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* purchseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart()); // To dispatch our function before the post request.

  try {
    const res = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());

  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';

  try {
    const res = yield axios.get('/orders.json' + queryParams);
    const fetchedOrders = [];
    for (let key in res.data) {
      // fetchedOrders.push(res.data[key]); // THIS: is fine but we can also...
      // Push a new Object on this fetchedOrders array,
      // where we distribute the proeprties of the orders Object we fetch from FireBase (which is a spread operator)
      // And add one new property of 'id' which is the 'key' => '-M0AiWYyBcnpQGaBn3US'.
      // Then we render our component we will essentially be using <Order key={ order.id } /> instead of FireBase 'id' - '-M0AiWYyBcnpQGaBn3US'
      fetchedOrders.push({
        ...res.data[key],
        id: key
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));

  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
