import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart()); // To dispatch our function before the post request.
    axios
      .post('/orders.json', orderData)
      .then(res => {
        // console.log('[order.js] action => res', res.data);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch(err => {
        // console.log('[order.js] action => err', err);
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = (orders) => {
  return {
    type: actionTypes.PURCHASE_INIT,
    orders: orders
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

// async code
export const fetchOrders = () => {
  // RETURN A FUNCTION WHICH GETS DISPATCHED FIRST
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          // console.log('key', key);
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
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        // console.log('[Orders.js] componentDidMount error =>', error);
        dispatch(fetchOrdersFail(error));
      });
  };
};
