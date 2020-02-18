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
        value: '',
        validation: {
          required: true
          // message: 'Please enter a valid Name'
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
          // message: 'Please enter a valid Street'
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
          // message: 'Please enter a valid Zip Code'
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
          // message: 'Please enter a valid Country'
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
          // message: 'Please enter a valid Email'
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: '',
        validation: {},
        valid: true
      }
    },
    loading: false
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) isValid = value.trim() !== '' && isValid; // remove white spaces with trim()
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid; // rules.minLength.absoluteMinLength
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    return isValid;
  }

  orderhandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    axios
      .post('/orders.json', order)
      .then(res => {
        // console.log('[ContactData.js] orderhandler => res', res);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
        // console.log('[ContactData.js] orderhandler => err', err);
      });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    console.log('updatedFormElement', updatedFormElement);

    this.setState({ orderForm: updatedOrderForm });
  }

  render () {
    const formElementArray = [];
    // Loop through our Array of JS Objects
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={ this.orderhandler }>
        { formElementArray.map(formElement => (
          <Input
            key={ formElement.id }
            elementType={ formElement.config.elementType }
            elementConfig={ formElement.config.elementConfig }
            value={ formElement.config.value }
            invalid={ !formElement.config.valid }
            shouldValidate={ formElement.config.validation }
            touched={ formElement.config.touched }
            changed={ (event) => this.inputChangedHandler(event, formElement.id) } />
        )) }
        <Button btnType='Success'>ORDER</Button>
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
