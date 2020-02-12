import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
      <p><strong>Total Price: { props.price }</strong></p>
      <p>Continue to Checkout?</p>
      <Button clicked={ props.purchaseCanceled } btnType="Danger">CANCEL</Button>
      <Button clicked={ props.purchasedContinued } btnType="Success">CONTINUE</Button>
    </Aux>
  );
};

orderSummary.propTypes = {
  price: PropTypes.string.isRequired,
  ingredients: PropTypes.object.isRequired,
  purchaseCanceled: PropTypes.func.isRequired,
  purchasedContinued: PropTypes.func.isRequired,
};

export default orderSummary;
