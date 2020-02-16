import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    // axios.get('/orders') // ENABLE: To test Orders component withErrorHandler(WrappedComponent)
    axios.get('/orders.json')
      .then(res => {
        console.log(res);

        // helper function
        const fetchOrders = [];
        for (let key in res.data) {
          // fetchOrders.push(res.data[key]); // THIS: is fine but we can also...

          // Push a new Object on this fetchOrders array,
          // where we distribute the proeprties of the orders Object we fetch from FireBase (which is a spread operator)
          // And add one new property of 'id' which is the 'key' => '-M0AiWYyBcnpQGaBn3US'.
          fetchOrders.push({ ...res.data[key], id: key });
          this.setState({ loaded: false, orders: fetchOrders });
        }
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
