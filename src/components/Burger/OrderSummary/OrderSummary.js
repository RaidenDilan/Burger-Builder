import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // This could be a functional/stateless component, doesn't have to be a class based/stateful component
  componentDidUpdate() {
    // console.log('[OrderSummary.js] componentDidUpdate');
  }

  render() {
    // We're expecting to get back an Object format of the ingredients prop.
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={ igKey }>
            <span style={ { textTransform: 'capitalize' } }>
              { igKey }
            </span>: { this.props.ingredients[igKey] }
          </li>
        );
      });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          { ingredientSummary }
        </ul>
        <p><strong>Total Price: { this.props.price }</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          clicked={ this.props.purchaseCanceled }
          btnType='Danger'
        >
          CANCEL
        </Button>
        <Button
          clicked={ this.props.purchasedContinued }
          btnType='Success'
        >
          CONTINUE
        </Button>
      </Aux>
    );
  }
};


// OrderSummary.propTypes = {
//   price: PropTypes.string,
//   ingredients: PropTypes.object,
//   purchaseCanceled: PropTypes.func,
//   purchasedContinued: PropTypes.func
// };

export default OrderSummary;
