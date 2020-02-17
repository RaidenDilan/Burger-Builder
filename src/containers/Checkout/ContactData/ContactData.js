import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
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
      price: this.props.price, // from props
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
        console.log('[ContactData.js] orderhandler => res', res);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log('[ContactData.js] orderhandler => err', err);
      });
  }

  render () {
    let form = (
      <form>
        <Input
          inputtype='input'
          type='text'
          name='name'
          placeholder='Your Name...' />
        <Input
          inputtype='input'
          type='email'
          name='email'
          placeholder='Your Email...' />
        <Input
          inputtype='input'
          type='text'
          name='street'
          placeholder='Your Street...' />
        <Input
          inputtype='input'
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
