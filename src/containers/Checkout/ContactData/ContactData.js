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
        },
        valid: false
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
        },
        valid: false
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
        },
        valid: false
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
        },
        valid: false
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
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
        // validation: {
        //   required: true
        // }
      }
    },
    loading: false
  }

  checkValidity(value, rules) {
    let isValid = false;

    if (rules.required) isValid = value.trim() !== ''; // remove white spaces with trim()
    if (rules.minLength) isValid = value.length >= rules.minLength; // rules.minLength.absoluteMinLength
    if (rules.maxLength) isValid = value.length <= rules.maxLength;

    return isValid;
  }

  orderhandler = (event) => {
    event.preventDefault();
    // console.log('[ContactData.js] orderhandler =>', this.props);
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

    // console.log('formData ------>>>', formData);
    // console.log('order ------>>>', order);

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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    console.log(updatedFormElement);

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
// export default withRouter(ContactData);
