import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    // console.log('[Orders.js] componentDidMount ===>', this.props.orders);
    // axios.get('/orders') // ENABLE: To test Orders component withErrorHandler(WrappedComponent)
    axios
      .get('/orders.json')
      .then(res => {
        // console.log('[Orders.js] componentDidMount res =>', res.data);
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

        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        console.log('[Orders.js] componentDidMount err =>', err);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        { this.state.orders.map(order => (
          <Order
            key={ order.id }
            ingredients={ order.ingredients }
            price={ order.price } />
          )) }
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
