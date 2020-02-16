import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderhandler = (event) => {
    event.preventDefault();
    // console.log('[ContactData.js] orderhandler =>', this.props);
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients, // from props
      price: this.props.totalPrice, // from props
      customer: {
        name: 'R. Dilan',
        address: {
          street: 'Test Street',
          zipCode: 'SW1X 7TA',
          country: 'United Kingdom'
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest'
    };

    axios
      .post('/orders.json', order)
      .then(res => {
        // console.log(res);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
        // console.log(err);
      });
  }

  render () {
    let form = (
      <form>
        <input
          className={ classes.Input }
          type='text'
          name='name'
          placeholder='Your Name...' />
        <input
          className={ classes.Input }
          type='email'
          name='email'
          placeholder='Your Email...' />
        <input
          className={ classes.Input }
          type='text'
          name='street'
          placeholder='Your Street...' />
        <input
          className={ classes.Input }
          type='text'
          name='postal'
          placeholder='Your Postal Code...' />
        <Button btnType='Success' clicked={ this.orderhandler }>ORDER</Button>
      </form>
    );

    if (this.state.loading) form = <Spinner />;

    return (
      <div className={ classes.ContactData }>
        <h4>Enter your Contact Data</h4>
        { form }
      </div>
    );
  }
}

export default ContactData;
// export default withRouter(ContactData);
