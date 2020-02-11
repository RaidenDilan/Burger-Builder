import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
  // We're expecting to get back an Object format of the ingredients prop.
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={ igKey }>
          <span style={ { textTransform: 'capitalize' } }>{ igKey }</span>: { props.ingredients[igKey] }
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
      <p>Continue to Checkout?</p>
      <button>CANCEL</button>
      <button>CONTINUE</button>
    </Aux>
  );
};

export default orderSummary;
