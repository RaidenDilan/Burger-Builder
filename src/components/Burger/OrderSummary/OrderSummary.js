import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  // This could be a functional/stateless component, doesn't have to be a class based/stateful component
  // We're expecting to get back an Object format of the ingredients prop.
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={ igKey }>
          <span style={ { textTransform: 'capitalize' } }>
            { igKey }
          </span>: { props.ingredients[igKey] }
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
      <p><strong>Total Price: { props.price.toFixed(2) }</strong></p>
      <p>Continue to Checkout?</p>
      <Button
        clicked={ props.purchaseCanceled }
        btnType='Danger'>
        CANCEL
      </Button>
      <Button
        clicked={ props.purchasedContinued }
        btnType='Success'>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
