import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ],
        value: ''
      },
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
          // elementType='...'
          // elementConfig='...'
          // value='...'
          type='text'
          name='name'
          placeholder='Your Name...' />
        <Input
          // elementType='...'
          // elementConfig='...'
          // value='...'
          type='email'
          name='email'
          placeholder='Your Email...' />
        <Input
          // elementType='...'
          // elementConfig='...'
          // value='...'
          type='text'
          name='street'
          placeholder='Your Street...' />
        <Input
          // elementType='...'
          // elementConfig='...'
          // value='...'
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
